'use client'

import { useState } from 'react';
import Form from 'next/form';
import { MdArrowForward, MdCheck } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FiBell, FiCalendar } from 'react-icons/fi';
import reminderTimes from '@/lib/reminderTimes';
import { openGoogleCalendar } from '@/lib/googleCalendar';
import { updateReminderTime } from './actions';

export default function ReminderPage({ initialReminderTime }: { initialReminderTime: string | null }) {
  const [selectedTime, setSelectedTime] = useState<string | null>(initialReminderTime);
  const [saved, setSaved] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleReminderSelect = async (value: string) => {
    setSelectedTime(value);
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
    
    const selectedOption = reminderTimes.find(t => t.value === selectedTime);
    if (selectedOption) {
      openGoogleCalendar(selectedOption.time, selectedOption.label);
      setCalendarAdded(true);
    }
  };

  const selectedOption = reminderTimes.find(t => t.value === selectedTime);

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

      <div className="bg-white rounded-3xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Choisissez votre moment idéal</h2>
        <p className="text-gray-600 mb-6">
          Sélectionnez le moment de la journée qui vous convient le mieux pour recevoir votre rappel
        </p>

        <Form action={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reminderTimes.map((time) => (
              <label
                key={time.value}
                className={`
                  relative flex items-start p-4 rounded-2xl border-2 cursor-pointer transition-all
                  ${selectedTime === time.value 
                    ? 'border-gray-500 bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <input
                  type="radio"
                  name="reminderTime"
                  value={time.value}
                  checked={selectedTime === time.value}
                  onChange={() => handleReminderSelect(time.value)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{time.icon}</span>
                    <span className="font-semibold">{time.label.replace(time.icon + ' ', '')}</span>
                    {selectedTime === time.value && (
                      <MdCheck className="ml-auto text-gray-600" size={24} />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{time.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Vers {time.time}</p>
                </div>
              </label>
            ))}
          </div>

          {selectedTime && (
            <div className="flex gap-3 mt-6 pt-6 border-t">
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

      {selectedTime && selectedOption && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-full">
              <FiCalendar className="text-blue-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                Ajoutez à votre agenda Google
              </h3>
              <p className="text-gray-700 mb-4">
                Créez un événement récurrent dans votre agenda Google pour recevoir automatiquement 
                vos rappels quotidiens <strong>{selectedOption.label.replace(selectedOption.icon + ' ', '').toLowerCase()}</strong>.
              </p>
              <button
                type="button"
                onClick={handleAddToCalendar}
                className="bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center gap-3 font-medium"
              >
                <FcGoogle size={24} />
                <span>Ajouter à Google Agenda</span>
                <MdArrowForward size={20} className="ml-auto" />
              </button>
              {calendarAdded && (
                <p className="text-green-600 text-sm mt-3 flex items-center gap-2">
                  <MdCheck size={18} />
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

