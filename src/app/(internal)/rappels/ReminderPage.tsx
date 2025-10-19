'use client'

import { useState } from 'react';
import Form from 'next/form';
import { MdArrowForward, MdCheck } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FiBell, FiCalendar } from 'react-icons/fi';
import { openGoogleCalendar } from '@/lib/googleCalendar';
import { getReminderMessageForTime } from '@/lib/reminderMessages';
import { updateReminderTime } from './actions';

export default function ReminderPage({ initialReminderTime }: { initialReminderTime: string | null }) {
  const [selectedTime, setSelectedTime] = useState<string | null>(initialReminderTime);
  const [saved, setSaved] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
    setSaved(false);
    setCalendarAdded(false);
  };

  const handleSave = async (formData: FormData) => {
    await updateReminderTime(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddToCalendar = () => {
    if (!selectedTime) return;
    
    openGoogleCalendar(selectedTime);
    setCalendarAdded(true);
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

        <Form action={handleSave} className="space-y-4">
          <div className="flex flex-col gap-3">
            <label htmlFor="reminderTime" className="text-base font-medium text-gray-700">
              Heure du rappel
            </label>
            <input
              type="time"
              id="reminderTime"
              name="reminderTime"
              value={selectedTime || ''}
              onChange={handleTimeChange}
              className="text-xl sm:text-3xl font-semibold p-3 sm:p-4 rounded-2xl border-2 border-gray-300 focus:border-gray-500 focus:outline-none transition-colors text-center"
              required
            />
            
            {reminderMessage && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-3 border border-blue-100">
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
                type="submit"
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-2xl hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                {saved ? (
                  <>
                    <MdCheck size={24} />
                    <span>Sauvegardé !</span>
                  </>
                ) : (
                  <>
                    <span>Sauvegarder ma préférence</span>
                    <MdArrowForward size={24} />
                  </>
                )}
              </button>
            </div>
          )}
        </Form>
      </div>

      {selectedTime && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100 p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-white rounded-full">
              <FiCalendar className="text-blue-600" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Ajoutez à votre agenda Google
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3">
                Créez un événement récurrent dans votre agenda Google pour recevoir automatiquement 
                vos rappels quotidiens à <strong>{selectedTime}</strong>.
              </p>
              <button
                type="button"
                onClick={handleAddToCalendar}
                className="bg-white border-2 border-gray-200 text-gray-700 py-2 px-4 sm:py-3 sm:px-6 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center gap-2 sm:gap-3 font-medium text-sm sm:text-base"
              >
                <FcGoogle size={20} />
                <span>Ajouter à Google Agenda</span>
                <MdArrowForward size={18} className="ml-auto" />
              </button>
              {calendarAdded && (
                <p className="text-green-600 text-sm mt-2 flex items-center gap-2">
                  <MdCheck size={16} />
                  Votre rappel a été ajouté à Google Agenda !
                </p>
              )}
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

