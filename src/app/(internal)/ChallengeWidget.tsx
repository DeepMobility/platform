"use client"

import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { MdEmojiEvents, MdFavorite, MdStar, MdCheckCircle, MdPeople, MdArrowForward, MdWorkspacePremium, MdOutlineTimer } from "react-icons/md"
import Confetti from "react-confetti"
import FullScreenModal from "@/components/FullScreenModal"
import { useTranslations, useFormatter } from 'next-intl'

export default function ChallengeWidget({ challenge }: { challenge: Challenge }) {
  const t = useTranslations('challenge')
  const format = useFormatter()
  const [showConfetti, setShowConfetti] = useState(challenge.status === 'completed')
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })
  const [modalOpen, setModalOpen] = useState(false)

  const isTeam = challenge.type === 'team'

  const endDate = new Date(challenge.endDate)
  const remainingDays = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const overallProgress = Math.min(120, Math.round((challenge.progress.totalPoints / challenge.progress.goalAmount) * 100))
  const goalExceeded = challenge.progress.totalPoints > challenge.progress.goalAmount
  const teamContribution = isTeam && challenge.progress.totalPoints > 0 ? Math.round((challenge.progress.currentUserTeamInfo.points / challenge.progress.totalPoints) * 100) : 0
  const userContribution = challenge.progress.totalPoints > 0 ? Math.round((challenge.progress.currentUserInfo.points / challenge.progress.totalPoints) * 100) : 0

  const formatEuros = (points: number) => {
    return `${(points * challenge.conversionRate).toFixed(2)} €`
  }

  const formatPoints = (points: number) => {
    return t('points', { count: points })
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (challenge.status === 'completed') {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
      return () => clearTimeout(timer)
    } else {
      setShowConfetti(false)
    }
  }, [challenge.status])

  return (
    <div className="relative w-full border border-[#a89b93] bg-gradient-to-r from-[#f7f3f0] via-white to-[#f7f3f0] rounded-3xl overflow-hidden shadow-sm">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.15}
            colors={["#c084fc", "#a855f7", "#7e22ce", "#f472b6", "#fcd34d"]}
          />
        </div>
      )}

      {challenge.status === 'completed' ? (
        <>
        <div className="bg-[#a89b93] text-white py-1 px-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="bg-white/20 rounded-full p-0.5">
              <span className="h-6 w-6 text-center block">🎉</span>
            </div>
            <div>
              <span className="font-bold text-sm flex items-center">
                {t('challengeCompleted')} <MdCheckCircle className="ml-1 h-3.5 w-3.5 text-green-300" />
              </span>
              <span className="text-xs text-white/90">{t('completedOn', { date: format.dateTime(endDate, { day: '2-digit', month: '2-digit', year: 'numeric' }) })}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs py-0 px-2 rounded-full">
              {t('participants', { count: challenge.progress.participantsCount })}
            </span>
          </div>
        </div>

        <div className="px-3 py-1.5 text-center border-b border-purple-100">
          <p className="text-xs text-[#7e5d3b] font-medium">
            {t.rich('bravoMessage', {
              amount: (chunks) => <span className="font-medium text-violet-800">{formatEuros(challenge.progress.totalPoints)}</span>,
              association: (chunks) => <span className="font-medium text-violet-800">{challenge.associationName}</span>,
            })}
          </p>
        </div>
        </>
      ) : (
        <div className="flex items-center gap-1 text-[#7e5d3b] bg-transparent px-3 py-1 text-xs font-normal mb-1">
          <MdOutlineTimer className="h-3.5 w-3.5 mr-1 opacity-70" />
          <span dangerouslySetInnerHTML={{ __html: t.markup('remainingDays', { count: remainingDays, strong: (chunks) => `<strong>${chunks}</strong>` }) }} />
        </div>
      )}

      <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 relative mb-1">
            <CircularProgressbar
              value={overallProgress > 100 ? 100 : overallProgress}
              text={`${overallProgress}%`}
              styles={buildStyles({
                textSize: "22px",
                pathColor: goalExceeded ? "#a78bfa" : "#a89b93",
                textColor: "#7e5d3b",
                trailColor: "#ede9fe",
              })}
            />
            {goalExceeded && (
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                <MdStar className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              </div>
            )}
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <h3 className="font-extrabold text-lg text-[#7e5d3b]">{challenge.title}</h3>
            </div>

            <p className="text-xs flex items-center justify-center text-[#5a493e] font-medium">
              <MdFavorite className="h-3 w-3 text-rose-400 mr-1" />
              {t('forAssociation', { name: challenge.associationName })}
            </p>

            <p className="text-xl font-extrabold text-[#7e5d3b] mt-1">
              {formatEuros(challenge.progress.totalPoints)}
              <span className="text-xs font-semibold text-[#a78bfa] ml-1">/ {formatEuros(challenge.progress.goalAmount)}</span>
            </p>

            {goalExceeded && (
              <p className="text-xs text-green-700 font-semibold mt-0.5 flex items-center justify-center">
                <MdStar className="h-3 w-3 mr-1 fill-green-700 text-green-700" />
                {t.rich('goalExceeded', {
                  amount: (chunks) => <span className="text-[#a78bfa] font-bold ml-1">{formatEuros(challenge.progress.totalPoints - challenge.progress.goalAmount)}</span>,
                })}
              </p>
            )}
          </div>
        </div>

        {isTeam ? (
          <div className="bg-white rounded-md border border-[#e7e3e1] p-2">
            <div className="flex justify-between items-center mb-1.5">
              <h4 className="text-sm font-bold text-[#7e5d3b] tracking-tight">{t('teamRanking')}</h4>
              <span className="bg-[#ebe5e0ab] text-[#887161] text-xs py-0.5 px-1.5 rounded-full inline-flex items-center font-semibold">
                <MdWorkspacePremium className="h-3 w-3 mr-1 text-[#887161]" />
                {t('myTeamRank', { rank: challenge.progress.currentUserTeamInfo.rank })}
              </span>
            </div>
            <div className="space-y-1 max-h-[180px] overflow-y-auto pr-1">
              {Object.values(challenge.progress.teamsInfo).sort((a, b) => a.rank - b.rank).map((team, index) => (
                <div
                  key={team.name + team.rank}
                  className={`flex items-center justify-between p-1.5 rounded-md ${
                    team.name === challenge.progress.currentUserTeamInfo.name
                      ? "bg-[#f9f5e7] border border-[#e7d7b6]"
                      : team.rank === 1
                        ? "bg-[#ede9fe] border border-[#e9d5ff]"
                        : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    {team.rank === 1 ? (
                      <span className="w-5 font-bold flex items-center">
                        🥇
                      </span>
                    ) : (
                      <span className="w-5 font-medium text-[#5a493e] text-xs">#{team.rank}</span>
                    )}
                    <span
                      className={`text-sm ${
                        team.rank === 1 ? "font-bold text-violet-800" : team.name === challenge.progress.currentUserTeamInfo.name ? "font-medium text-[#5a493e]" : ""
                      }`}
                    >
                      {team.name}
                    </span>
                    {team.name === challenge.progress.currentUserTeamInfo.name && team.rank !== 1 && (
                      <div className="ml-1.5 inline-flex">
                        <span className="h-4 px-1 text-[10px] bg-white text-[#5a493e] border-[#a89b93] whitespace-nowrap rounded-full">
                          {t('myTeam')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-medium text-sm ${
                        team.rank === 1 ? "text-violet-800" : team.name === challenge.progress.currentUserTeamInfo.name ? "text-[#5a493e]" : ""
                      } whitespace-nowrap`}
                    >
                      {formatPoints(team.points)}
                    </span>
                    <span className="text-xs text-muted-foreground">({team.membersCount})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-md border border-[#e7e3e1] p-2">
            <div className="flex justify-between items-center mb-1.5">
              <h4 className="text-sm font-bold text-[#7e5d3b] tracking-tight">{t('participantRanking')}</h4>
              <span className="bg-[#ede9fe] text-[#7e5d3b] border-[#a89b93] text-xs py-0 px-2 rounded-full inline-flex items-center font-semibold">
                <MdWorkspacePremium className="h-3 w-3 mr-1 text-[#a78bfa]" />
                {t('myRank', { rank: challenge.progress.currentUserInfo.rank })}
              </span>
            </div>
            <div className="space-y-1 max-h-[180px] overflow-y-auto pr-1">
              {Object.values(challenge.progress.usersInfo).sort((a, b) => a.rank - b.rank).map((user, index) => (
                <div
                  key={user.name + user.rank}
                  className={`flex items-center justify-between p-1.5 rounded-md ${
                    user.name === challenge.progress.currentUserInfo.name
                      ? "bg-[#f9f5e7] border border-[#e7d7b6]"
                      : user.rank === 1
                        ? "bg-[#ede9fe] border border-[#e9d5ff]"
                        : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    {user.rank === 1 ? (
                      <span className="w-5 font-bold text-[#a78bfa] flex items-center">
                        🥇
                      </span>
                    ) : (
                      <span className="w-5 font-medium text-[#5a493e] text-xs">#{user.rank}</span>
                    )}
                    <span
                      className={`text-sm ${
                        user.rank === 1 ? "font-bold text-amber-800" : user.name === challenge.progress.currentUserInfo.name ? "font-medium" : ""
                      }`}
                    >
                      {user.name}
                    </span>
                    {user.name === challenge.progress.currentUserInfo.name && user.rank !== 1 && (
                      <div className="ml-1.5 inline-flex">
                        <span className="h-4 px-1 text-[10px] bg-white text-[#5a493e] border-[#a89b93] whitespace-nowrap rounded-full">
                          {t('me')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-medium text-sm ${
                        user.rank === 1 ? "text-amber-600" : user.name === challenge.progress.currentUserInfo.name ? "text-[#5a493e]" : ""
                      } whitespace-nowrap`}
                    >
                      {user.points} €
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col">
          <div className="bg-[#f7f3f0] rounded-md p-2 mb-2 border border-[#e7e3e1]">
            <h4 className="text-sm font-bold text-[#7e5d3b] mb-1.5">{isTeam ? t('ourTeam') : t('myParticipation')}</h4>

            <div className="flex items-center justify-between mb-1.5">
              <div className="text-xl font-extrabold text-[#7e5d3b]">
                {isTeam ? formatPoints(challenge.progress.currentUserTeamInfo.points) : formatPoints(challenge.progress.currentUserInfo.points)}
              </div>
            </div>

            <div className="text-xs text-[#5a493e]">
              {isTeam ? (
                <>
                  {t.rich('contributedPercentage', {
                    name: (chunks) => <span className="font-semibold text-[#5a493e]">{challenge.progress.currentUserTeamInfo.name}</span>,
                    percentage: (chunks) => <span className="font-semibold text-[#a78bfa]">{teamContribution}%</span>,
                  })}
                </>
              ) : (
                <>
                  {t.rich('contributedPercentage', {
                    name: (chunks) => <span className="font-semibold text-[#5a493e]">{challenge.progress.currentUserInfo.name}</span>,
                    percentage: (chunks) => <span className="font-semibold text-[#a78bfa]">{userContribution}%</span>,
                  })}
                </>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#5a493e] mt-1">
              {isTeam ? (
                <>
                  <div className="flex items-center">
                    <MdPeople className="h-3 w-3 mr-1 text-[#a78bfa]" />
                    {t('members', { count: challenge.progress.currentUserTeamInfo.membersCount })}
                  </div>
                  <div className="text-xs">
                    {t('myContribution')} <span className="font-semibold text-[#a78bfa]">{formatPoints(challenge.progress.currentUserInfo.points)}</span>
                  </div>
                </>
              ) : (
                <div className="text-xs">
                  {t('myContribution')} <span className="font-semibold text-[#a78bfa]">{formatPoints(challenge.progress.currentUserInfo.points)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-md border border-[#e7e3e1] p-2">
            <h4 className="text-sm font-bold text-[#7e5d3b] mb-1.5">{t('actions')}</h4>
            <button
              className="btn-ghost w-full text-[#a78bfa] hover:bg-[#ede9fe] hover:text-[#a78bfa] justify-start text-sm h-7 flex items-center font-semibold"
              onClick={() => setModalOpen(true)}
            >
              <MdArrowForward className="h-3.5 w-3.5 mr-2" />
              {t('viewDetails')}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <FullScreenModal closeModal={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative border border-[#ebe5e0]">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center bg-[#ebe5e0ab] rounded-full p-2">
                <MdEmojiEvents className="h-7 w-7 text-[#7e22ce]" />
              </span>
              <div>
                <h2 className="text-2xl font-extrabold text-[#5a493e] leading-tight">{challenge.title}</h2>
                <div className="text-xs text-[#5a493e] font-medium">{t('forAssociation', { name: challenge.associationName })}</div>
              </div>
            </div>
            <p className="mb-4 text-sm text-[#5a493e] italic border-l-4 border-[#ebe5e0] pl-3">{challenge.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#f7f3f0] rounded-xl shadow p-3 flex flex-col items-center">
                <span className="text-xs text-[#5a493e]">{t('amountCollected')}</span>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-[#7e22ce]">{formatEuros(challenge.progress.totalPoints)}</span>
                  <span className="text-xs text-[#5a493e]">/ {formatEuros(challenge.progress.goalAmount)}</span>
                </div>
              </div>
              <div className="bg-[#f7f3f0] rounded-xl shadow p-3 flex flex-col items-center">
                <span className="text-xs text-[#5a493e]">{t('participants', { count: challenge.progress.participantsCount })}</span>
                <span className="text-lg font-bold text-[#7e22ce]">{challenge.progress.participantsCount}</span>
              </div>
              <div className="bg-[#f7f3f0] rounded-xl shadow p-3 flex flex-col items-center">
                <span className="text-xs text-[#5a493e]">{t('endOfChallenge')}</span>
                <span className="text-lg font-bold text-[#7e22ce]">{format.dateTime(endDate, { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
              </div>
              {isTeam && (
                <div className="bg-[#f7f3f0] rounded-xl shadow p-3 flex flex-col items-center">
                  <span className="text-xs text-[#5a493e]">{t('teamRankLabel')}</span>
                  <span className="text-lg font-bold text-[#7e22ce]">#{challenge.progress.currentUserTeamInfo.rank}</span>
                </div>
              )}
              {!isTeam && (
                <div className="bg-[#f7f3f0] rounded-xl shadow p-3 flex flex-col items-center">
                  <span className="text-xs text-[#5a493e]">{t('myRankLabel')}</span>
                  <span className="text-lg font-bold text-[#7e22ce]">#{challenge.progress.currentUserInfo.rank}</span>
                </div>
              )}
            </div>
            <div className="mb-4">
              {isTeam ? (
                <>
                  <div className="mb-2 flex items-center gap-2">
                    <MdWorkspacePremium className="h-5 w-5 text-[#5a493e]" />
                    <span className="text-sm text-[#5a493e]">{t('teamPoints')} <span className="font-bold text-[#7e22ce]">{formatPoints(challenge.progress.currentUserTeamInfo.points)}</span></span>
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <MdPeople className="h-5 w-5 text-[#5a493e]" />
                    <span className="text-sm text-[#5a493e]">{t('teamMembers')} <span className="font-bold text-[#7e22ce]">{challenge.progress.currentUserTeamInfo.membersCount}</span></span>
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <MdStar className="h-5 w-5 text-[#5a493e]" />
                    <span className="text-sm text-[#5a493e]">{t('myContribution')} <span className="font-bold text-[#7e22ce]">{formatPoints(challenge.progress.currentUserInfo.points)}</span></span>
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <MdWorkspacePremium className="h-5 w-5 text-[#5a493e]" />
                    <span className="text-sm text-[#5a493e]">{t('myTeamRankDetail')} <span className="font-bold text-[#7e22ce]">#{challenge.progress.currentUserInfo.rank}</span></span>
                  </div>
                  <div className="mb-2 text-xs text-[#5a493e] font-semibold mt-3">{t('teamRanking')}</div>
                  <ul className="mb-2 text-xs text-[#5a493e] max-h-32 overflow-y-auto rounded-lg border border-[#ebe5e0] bg-[#faf5ff]">
                    {Object.values(challenge.progress.teamsInfo).sort((a, b) => a.rank - b.rank).map(team => (
                      <li key={team.name + team.rank} className={`flex justify-between px-3 py-1 ${team.name === challenge.progress.currentUserTeamInfo.name ? 'bg-[#f9f5e7]' : team.rank === 1 ? 'bg-[#ede9fe]' : ''}`}>
                        <span className={`flex items-center ${team.rank === 1 ? 'text-[#7e22ce] font-bold' : team.name === challenge.progress.currentUserTeamInfo.name ? 'text-[#bfa76a] font-bold' : ''}`}>
                          {team.rank === 1 ? <MdEmojiEvents className="h-3.5 w-3.5 mr-1 text-[#7e22ce]" /> : team.name === challenge.progress.currentUserTeamInfo.name ? <MdEmojiEvents className="h-3.5 w-3.5 mr-1 text-[#bfa76a]" /> : <span className="w-3.5 inline-block mr-1" />}#{team.rank} {team.name}
                        </span>
                        <span>{formatPoints(team.points)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <div className="mb-2 flex items-center gap-2">
                    <MdStar className="h-5 w-5 text-[#5a493e]" />
                    <span className="text-sm text-[#5a493e]">{t('myContribution')} <span className="font-bold text-[#7e22ce]">{formatPoints(challenge.progress.currentUserInfo.points)}</span></span>
                  </div>
                  <div className="mb-2 text-xs text-[#5a493e] font-semibold mt-3">{t('participantRanking')}</div>
                  <ul className="mb-2 text-xs text-[#5a493e] max-h-32 overflow-y-auto rounded-lg border border-[#ebe5e0] bg-[#faf5ff]">
                    {Object.values(challenge.progress.usersInfo).sort((a, b) => a.rank - b.rank).map(user => (
                      <li key={user.name + user.rank} className={`flex justify-between px-3 py-1 ${user.name === challenge.progress.currentUserInfo.name ? 'bg-[#f9f5e7]' : user.rank === 1 ? 'bg-[#ede9fe]' : ''}`}>
                        <span className={`flex items-center ${user.rank === 1 ? 'text-[#7e22ce] font-bold' : user.name === challenge.progress.currentUserInfo.name ? 'text-[#bfa76a] font-bold' : ''}`}>
                          {user.rank === 1 ? <MdEmojiEvents className="h-3.5 w-3.5 mr-1 text-[#7e22ce]" /> : user.name === challenge.progress.currentUserInfo.name ? <MdEmojiEvents className="h-3.5 w-3.5 mr-1 text-[#bfa76a]" /> : <span className="w-3.5 inline-block mr-1" />}#{user.rank} {user.name}
                        </span>
                        <span>{formatPoints(user.points)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </FullScreenModal>
      )}
    </div>
  )
}
