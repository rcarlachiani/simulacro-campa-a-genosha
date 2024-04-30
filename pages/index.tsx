import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { differenceInCalendarDays } from 'date-fns';
import type { NextPage } from 'next';
import es from 'date-fns/locale/es';
import 'react-day-picker/dist/style.css';
import Head from 'next/head';

const Home: NextPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [artistName, setArtistName] = useState('');
  const [backline, setBackline] = useState('');
  const [selected, setSelected] = useState<Date>();
  const [schedule, setSchedule] = useState('');
  const [checked, setChecked] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selected) {
      const date = format(selected, 'PPPP', { locale: es });
      const formatedDateCountdown =
        format(selected, 'PP') + ' ' + schedule + ' GMT-3';
      const formatedHour = schedule.replace(':00', '') + 'hs';
      const terms = checked === true ? 'Sí' : 'No';

      let form = {
        date,
        formatedDateCountdown,
        formatedHour,
        backline,
        artistName,
        name,
        lastName,
        email,
        phone,
        terms,
      };

      fetch('/api/mail', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      }).then((res) => {
        console.log('Response received');
        if (res.status === 200) {
          console.log('Response succeeded!');
        }
      });

      const rawResponse = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const content = await rawResponse.json();

      setArtistName('');
      setPhone('');
      setName('');
      setLastName('');
      setEmail('');
      setBackline('');
      setSchedule('');
      setSelected(undefined);
      setChecked(false);

      router.push({
        pathname: 'success',
        query: {
          date: formatedDateCountdown,
          selectedDate: selected
            ? format(selected, 'PPPP', { locale: es })
            : '',
          selectedHour: formatedHour,
        },
      });
    } else {
      alert('Debes seleccionar una fecha de reserva');
    }
  };

  function isPastDate(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  function clearData() {
    setArtistName('');
    setPhone('');
    setName('');
    setLastName('');
    setEmail('');
    setBackline('');
    setSchedule('');
    setSelected(undefined);
    setChecked(false);
  }

  return (
    <>
      <Head>
        <title>Audio y Tambor - Drum Tracking Studios</title>
      </Head>
      <main
        className='flex flex-col items-center bg-center bg-cover'
        id='register-section'
        style={{ backgroundImage: 'url(/images/wall2.webp)' }}
      >
        <Header />
        <div className='max-w-5xl'>
          <form
            className='flex flex-col items-center mb-10'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col p-0 sm:flex-row sm:p-2'>
              <label htmlFor='name' className='sr-only'>
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                name='name'
                id='name'
                className='mx-4 my-2 sm:my-0 border-4 border-yellow focus:border-yellow bg-whitesmoke font-Montserrat rounded-full'
                placeholder='Nombre'
                required
              />
              <label htmlFor='lastName' className='sr-only'>
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type='text'
                name='lastName'
                id='lastName'
                className='mx-4 my-2 sm:my-0 border-4 border-yellow focus:border-yellow bg-whitesmoke font-Montserrat rounded-full'
                placeholder='Apellido'
                required
              />
            </div>

            <div className='flex flex-col p-0 sm:flex-row sm:p-2'>
              <label htmlFor='email' className='sr-only'>
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                name='email'
                id='email'
                className='mx-4 my-2 sm:my-0 border-4 border-yellow focus:border-yellow bg-whitesmoke font-Montserrat rounded-full'
                placeholder='Email'
                required
              />
              <label htmlFor='phone' className='sr-only'>
                Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type='tel'
                name='phone'
                id='phone'
                className='mx-4 my-2 sm:my-0 border-4 border-yellow focus:border-yellow bg-whitesmoke font-Montserrat rounded-full'
                placeholder='Teléfono'
                required
              />
            </div>

            <div className='flex flex-col p-0 sm:flex-row sm:p-2'>
              <label htmlFor='artistName' className='sr-only'>
                Artist Name
              </label>
              <input
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                type='text'
                name='artistName'
                id='artistName'
                className='mx-4 my-2 sm:my-0 border-4 border-yellow focus:border-yellow bg-whitesmoke font-Montserrat rounded-full'
                placeholder='Nombre artista/banda'
                required
              />
              <select
                value={backline}
                onChange={(e) => setBackline(e.target.value)}
                className='mx-4 my-2 sm:my-0 border-4 border-yellow focus:border-yellow bg-whitesmoke font-Montserrat rounded-full'
                required
              >
                <option value='' disabled hidden>
                  Alquiler de backline
                </option>
                <option value='Sí'>Sí</option>
                <option value='No'>No</option>
              </select>
            </div>
            <h2 className='my-3 font-Montserrat text-center leading-none text-white font-bold text-[20px] md:text-[25px] xl:text-[25px] xxl:text-[25px] p-4 drop-shadow-lg'>
              Fecha de reserva
            </h2>
            <div className='mt-2 flex bg-white rounded-lg calendar-container'>
              <DayPicker
                mode='single'
                locale={es}
                selected={selected}
                onSelect={setSelected}
                disabled={isPastDate}
              />
            </div>
            <h2 className='mb-3 font-Montserrat text-center leading-none text-white font-bold text-[20px] md:text-[25px] xl:text-[25px] xxl:text-[25px] p-4 drop-shadow-lg'>
              Horario
            </h2>
            <select
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className='border-4 border-yellow focus:border-yellow bg-whitesmoke font-Montserrat rounded-full'
              required
            >
              <option value='' disabled hidden>
                Seleccione un horario
              </option>
              <option value='8:00:00'>08:00hs</option>
              <option value='9:00:00'>09:00hs</option>
              <option value='10:00:00'>10:00hs</option>
              <option value='11:00:00'>11:00hs</option>
              <option value='18:00:00'>18:00hs</option>
              <option value='19:00:00'>19:00hs</option>
              <option value='20:00:00'>20:00hs</option>
            </select>
            <div className='flex items-center mt-10 mb-5'>
              <p className='flex items-center text-white drop-shadow-md'>
                <input
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  name='accept'
                  type='checkbox'
                  className='rounded-full checked:bg-lightgreen mx-2'
                  required
                />
                Estoy de acuerdo con las políticas de cancelación
              </p>
            </div>
            <div className='flex flex-col items-center'>
              <button
                type='button'
                onClick={clearData}
                className='reset-button text-white bg-lightgreen font-Montserrat font-bold my-3 px-10 border border-lightgreen rounded-full flex items-center'
              >
                REINICIAR CAMPOS
              </button>
              <button
                type='submit'
                className='text-white bg-lightgreen font-Montserrat font-bold my-3 py-3 px-10 border border-lightgreen rounded-full flex items-center'
              >
                REGISTRAR TURNO
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
