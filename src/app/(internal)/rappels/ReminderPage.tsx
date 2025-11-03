'use client'

import { useState, useRef } from 'react';
import { MdArrowForward, MdCheck } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FiBell, FiCalendar } from 'react-icons/fi';
import { openGoogleCalendar } from '@/lib/googleCalendar';
import { getReminderMessageForTime } from '@/lib/reminderMessages';
import { updateReminderTime } from './actions';

export default function ReminderPage({ initialReminderTime }: { initialReminderTime: string | null }) {
  const [selectedTime, setSelectedTime] = useState<string | null>(initialReminderTime);
  const [saved, setSaved] = useState(false);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
    setSaved(false);
  };

  const handleContainerClick = () => {
    timeInputRef.current?.showPicker();
  };

  const handleSaveAndAddToCalendar = async () => {
    if (!selectedTime) return;
    
    openGoogleCalendar(selectedTime);

    const formData = new FormData();
    formData.append('reminderTime', selectedTime);
    await updateReminderTime(formData);
    
    setSaved(true);
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
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={handleSaveAndAddToCalendar}
                className="flex-1 bg-deepmobility-500 text-white py-3 px-6 rounded-2xl hover:bg-deepmobility-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {saved ? (
                  <>
                    <MdCheck size={24} />
                    <span>Rappel configuré !</span>
                  </>
                ) : (
                  <>
                    <FcGoogle size={24} />
                    <span>Enregistrer et ajouter à Google Agenda</span>
                    <MdArrowForward size={24} />
                  </>
                )}
              </button>
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
                Votre rappel quotidien a été enregistré pour <strong>{selectedTime}</strong> et l'événement récurrent 
                a été ajouté à votre agenda Google. Vous recevrez maintenant une notification chaque jour à cette heure.
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

