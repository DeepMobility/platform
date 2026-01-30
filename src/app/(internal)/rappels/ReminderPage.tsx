'use client'

import { useState, useRef } from 'react';
import { MdCheck, MdContentCopy, MdLink } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FiBell } from 'react-icons/fi';
import { PiMicrosoftOutlookLogo } from 'react-icons/pi';
import { openGoogleCalendar } from '@/lib/googleCalendar';
import { openOutlookCalendar } from '@/lib/outlookCalendar';
import { getReminderMessageForTime } from '@/lib/reminderMessages';
import { updateReminderTime } from './actions';

interface ReminderPageProps {
  initialReminderTime: string | null;
  calendarUrl: string | null;
}

export default function ReminderPage({ initialReminderTime, calendarUrl }: ReminderPageProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(initialReminderTime);
  const [saved, setSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
    setSaved(false);
  };

  const handleContainerClick = () => {
    timeInputRef.current?.showPicker();
  };

  const handleSaveReminderTime = async () => {
    if (!selectedTime) return;
    const formData = new FormData();
    formData.append('reminderTime', selectedTime);
    await updateReminderTime(formData);
    setSaved(true);
  };

  const handleAddToGoogle = async () => {
    if (!selectedTime) return;
    openGoogleCalendar(selectedTime);
    await handleSaveReminderTime();
  };

  const handleAddToOutlook = async () => {
    if (!selectedTime) return;
    openOutlookCalendar(selectedTime);
    await handleSaveReminderTime();
  };

  const handleCopyLink = async () => {
    if (!calendarUrl) return;
    await navigator.clipboard.writeText(calendarUrl);
    setCopiedLink(true);
    await handleSaveReminderTime();
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const reminderMessage = selectedTime ? getReminderMessageForTime(selectedTime) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <FiBell className="text-gray-600" />
          Mes rappels quotidiens
        </h1>
        <p className="text-gray-600">
          Configurez un rappel quotidien pour ne jamais manquer votre routine bien-être
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Choisissez votre heure de rappel</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Sélectionnez l'heure précise à laquelle vous souhaitez recevoir votre rappel quotidien
        </p>

        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <label htmlFor="reminderTime" className="text-base font-medium text-gray-700">
              Heure du rappel
            </label>
            <div 
              onClick={handleContainerClick}
              className="cursor-pointer rounded-2xl border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              <input
                ref={timeInputRef}
                type="time"
                id="reminderTime"
                name="reminderTime"
                value={selectedTime || ''}
                onChange={handleTimeChange}
                className="w-full text-xl sm:text-3xl font-semibold p-3 sm:p-4 rounded-2xl border-none focus:outline-none transition-colors text-center bg-transparent cursor-pointer"
                required
              />
            </div>
            
            {reminderMessage && (
              <div className="bg-gradient-to-br from-deepmobility-50 to-deepmobility-100 rounded-2xl p-3 border border-deepmobility-200">
                <div className="flex gap-2 items-start">
                  <span className="text-2xl">{reminderMessage.emoji}</span>
                  <p className="text-sm text-gray-700 flex-1">{reminderMessage.message}</p>
                </div>
              </div>
            )}
          </div>

          {selectedTime && (
            <div className="pt-4 border-t space-y-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Ajouter au calendrier :</p>
              
              {/* Google and Outlook buttons on same line */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToGoogle}
                  className="bg-white border-2 border-gray-200 py-3 px-4 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FcGoogle size={24} />
                  <span className="font-medium">Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToOutlook}
                  className="bg-white border-2 border-gray-200 py-3 px-4 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <PiMicrosoftOutlookLogo size={24} className="text-[#0078D4]" />
                  <span className="font-medium">Outlook</span>
                </button>
              </div>

              {/* iCal link option */}
              {calendarUrl && (
                <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <MdLink size={20} className="text-gray-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-700 text-sm">Lien iCal dynamique</p>
                        <p className="text-xs text-gray-500 truncate">
                          {calendarUrl}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors flex-shrink-0 ${
                        copiedLink
                          ? 'bg-green-500 text-white'
                          : 'bg-deepmobility-500 text-white hover:bg-deepmobility-600'
                      }`}
                    >
                      {copiedLink ? (
                        <>
                          <MdCheck size={18} />
                          <span>Copié !</span>
                        </>
                      ) : (
                        <>
                          <MdContentCopy size={18} />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Abonnez-vous avec Apple Calendar, Thunderbird ou tout autre calendrier. Les modifications seront synchronisées automatiquement.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedTime && saved && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-sm border border-green-200 p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-white rounded-full">
              <MdCheck className="text-green-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-green-800">
                Rappel configuré avec succès !
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Votre rappel quotidien a été enregistré pour <strong>{selectedTime}</strong>. 
                L'événement récurrent a été ajouté à votre calendrier. Vous recevrez maintenant une notification chaque jour à cette heure.
              </p>
            </div>
          </div>
        </div>
      )}

      {!selectedTime && (
        <div className="bg-gray-50 rounded-3xl border border-gray-200 p-8 text-center">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-xl font-semibold mb-2">Aucun rappel configuré</h3>
          <p className="text-gray-600">
            Sélectionnez un moment de la journée ci-dessus pour commencer
          </p>
        </div>
      )}
    </div>
  );
}
