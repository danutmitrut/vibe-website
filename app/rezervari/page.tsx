'use client';

/**
 * 📅 PAGINA DE REZERVĂRI - Sistem de booking pentru cafenea
 *
 * Pentru cursanți:
 * - 'use client' = componenta interactivă (useState, onClick)
 * - useState = hook pentru state management (datele care se schimbă)
 * - Calendar picker simplu cu zile disponibile
 * - Slot-uri orare pentru a alege timpul vizitei
 */

import { useState } from 'react';
import Link from 'next/link';

export default function RezervarePage() {
  // 📊 STATE MANAGEMENT
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
  });
  const [submitted, setSubmitted] = useState(false);

  // 📅 GENERARE ZILE DISPONIBILE (următoarele 14 zile)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const availableDates = generateAvailableDates();

  // ⏰ SLOT-URI ORARE DISPONIBILE
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00'
  ];

  // 📝 FORMAT DATA (ex: Luni, 18 Dec)
  const formatDate = (date: Date) => {
    const days = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
    const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];

    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  // 🎯 HANDLE FORM SUBMIT
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // În producție, aici ar merge un API call către backend
    console.log('Rezervare:', {
      date: selectedDate,
      time: selectedTime,
      ...formData,
    });

    setSubmitted(true);
  };

  // ✅ ECRAN CONFIRMARE
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-20">
        <div className="glass max-w-2xl w-full rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            Rezervare Confirmată!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Vă așteptăm cu drag la Vibe Coffee
          </p>

          <div className="glass bg-white/50 rounded-2xl p-6 mb-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Data & Ora</p>
                <p className="text-lg font-semibold text-foreground">
                  {selectedDate} la {selectedTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Număr persoane</p>
                <p className="text-lg font-semibold text-foreground">{formData.guests} persoane</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Nume</p>
                <p className="text-lg font-semibold text-foreground">{formData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Contact</p>
                <p className="text-lg font-semibold text-foreground">{formData.phone}</p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-8">
            Veți primi un email de confirmare la <span className="font-semibold">{formData.email}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              Înapoi Acasă
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedDate('');
                setSelectedTime('');
                setFormData({ name: '', email: '', phone: '', guests: '2' });
              }}
              className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              Rezervare Nouă
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 📋 FORMULAR REZERVARE
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6 text-primary hover:text-primary-dark transition-colors">
            ← Înapoi
          </Link>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Rezervă o <span className="text-primary">Masă</span>
          </h1>
          <p className="text-xl text-gray-600">
            Alege data, ora și completează detaliile pentru rezervare
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-12">
          {/* STEP 1: SELECTEAZĂ DATA */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
              Selectează Data
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableDates.map((date, index) => {
                const dateStr = formatDate(date);
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-lg scale-105'
                        : 'border-gray-200 bg-white hover:border-primary hover:scale-105'
                    }`}
                  >
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'} mb-1`}>
                      {date.toLocaleDateString('ro-RO', { weekday: 'short' })}
                    </div>
                    <div className={`text-2xl font-bold ${isSelected ? 'text-white' : 'text-foreground'}`}>
                      {date.getDate()}
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {date.toLocaleDateString('ro-RO', { month: 'short' })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SELECTEAZĂ ORA */}
          {selectedDate && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                Selectează Ora
              </h2>

              <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-xl border-2 font-semibold transition-all duration-300 ${
                        isSelected
                          ? 'border-primary bg-primary text-white shadow-lg scale-105'
                          : 'border-gray-200 bg-white hover:border-primary hover:scale-105'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DETALII PERSONALE */}
          {selectedDate && selectedTime && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                Detalii Rezervare
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NUME */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nume Complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="Ion Popescu"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="ion@example.com"
                  />
                </div>

                {/* TELEFON */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="0712 345 678"
                  />
                </div>

                {/* NUMĂR PERSOANE */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Număr Persoane *
                  </label>
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'persoană' : 'persoane'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          {selectedDate && selectedTime && (
            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Confirmă Rezervarea
            </button>
          )}
        </form>

        {/* INFO FOOTER */}
        <div className="mt-8 text-center text-gray-600">
          <p className="mb-2">
            <span className="font-semibold">Program:</span> Luni - Duminică, 08:00 - 22:00
          </p>
          <p>
            <span className="font-semibold">Contact:</span> 0721 234 567 | rezervari@vibecoffee.ro
          </p>
        </div>
      </div>
    </div>
  );
}
