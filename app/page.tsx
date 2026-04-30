"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------------- MONOGRAM ---------------- */
const Monogram = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <defs>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E6C27A"/>
        <stop offset="50%" stopColor="#C9A86A"/>
        <stop offset="100%" stopColor="#F2D28F"/>
      </linearGradient>
    </defs>

    <motion.circle
      cx="100" cy="100" r="78"
      fill="none"
      stroke="url(#gold)"
      strokeWidth="1.2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.8 }}
    />

    <motion.text
      x="50%" y="55%"
      textAnchor="middle"
      style={{ fill: 'url(#gold)', fontSize: 36, fontFamily: 'Book Antiqua' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      A+A
    </motion.text>
  </svg>
);

/* ---------------- TYPES ---------------- */
type CardProps = {
  title: string;
  img: string;
  date: string;
  venue: string;
  mapLink: string;
 embed?: string;
uploadLink?: string;
galleryLink?: string;
};

/* ---------------- CARD COMPONENT ---------------- */
const Card = ({
  title,
  img,
  date,
  venue,
  mapLink,
  embed,
  uploadLink,
  galleryLink,
}: CardProps) => {

  const [open, setOpen] = useState(false);

  const today = new Date();
  const galleryDate = new Date('2026-06-09');

  const showUpload = true;
  const showGallery = today >= galleryDate;

  return (
    <div className='mb-10'>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(!open)}
        className='w-full border border-[#C9A86A] rounded-full p-4 text-2xl tracking-wide bg-white/5 backdrop-blur-sm'
      >
        {title}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className='overflow-hidden mt-5 rounded-[2rem] shadow-2xl'
          >

            <div
              className='min-h-[600px] rounded-[2rem] p-6 flex flex-col justify-end bg-cover bg-center relative overflow-hidden'
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(15,81,50,0.2), rgba(15,81,50,0.5), rgba(15,81,50,0.95)), url(${img})`
              }}
            >

              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent'
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 8 }}
              />

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='relative'
              >
                <h3 className='text-4xl mb-3' style={{ fontFamily: 'Book Antiqua', color: '#F2D28F' }}>
                  {title}
                </h3>

                <p style={{ fontFamily: 'Times New Roman' }}>{date}</p>
                <p style={{ fontFamily: 'Times New Roman' }}>{venue}</p>

                <div className='flex gap-3 mt-6 flex-wrap'>
                  <a href={mapLink} target='_blank' className='border border-[#C9A86A] rounded-full px-4 py-2'>
                    Directions
                  </a>

                  {showUpload && (
                    <a href={uploadLink} target='_blank' className='border border-slate-300 rounded-full px-4 py-2'>
                      Upload Photos
                    </a>
                  )}

                  {showGallery && (
                    <a href={galleryLink} target='_blank' className='bg-[#C9A86A] text-black rounded-full px-4 py-2'>
                      View Gallery
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            <div className='p-4 bg-[#0F5132]'>
              <iframe
                src={embed}
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------------- MAIN PAGE ---------------- */
export default function WeddingInvitePreview() {

useEffect(() => {
  requestAnimationFrame(() => {
    const t = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(t);
  });
}, []);

  return (
    <div className='min-h-screen text-white overflow-x-hidden'>

      {/* LOADER */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center bg-[#0F5132]'
            exit={{ opacity: 0 }}
          >
            <div className='w-40 h-40'>
              <Monogram />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section
        className='min-h-screen flex items-center justify-center px-6 relative text-center overflow-hidden'
        style={{
          backgroundImage: `linear-gradient(rgba(15,81,50,0.7),rgba(15,81,50,0.95)), url("/Monsoon Background.png")`,
          backgroundSize: 'cover'
        }}
      >

        <motion.div
          className='absolute w-[400px] h-[400px] bg-white/5 blur-3xl'
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 20 }}
        />

        <div className='relative z-10'>
          <div className='w-24 h-24 mx-auto mb-6'>
            <Monogram />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='text-5xl'
            style={{ fontFamily: 'Book Antiqua' }}
          >
            Ashfaq weds Afreen
          </motion.h1>

          <p className='mt-3 opacity-80'>اشفاق عفرین</p>
          <p className='mt-10 opacity-70 animate-pulse'>Scroll ↓</p>
        </div>
      </section>

      {/* CARDS */}
      <section className='px-5 py-16 max-w-md mx-auto text-center'>

        <Card
          title='Nikah'
          date='7 June 2026 • 6:00 PM Insha Allah'
          venue='Utsav Function Hall, Visakhapatnam'
          img='/Nikah Card.png'
          mapLink='https://maps.app.goo.gl/nRqWLRaNQ7uSrWwj9'
          embed='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.725105144662!2d83.18449037494142!3d17.66317408327179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a396969f24128bb%3A0xe49749c4b6477c06!2sUtsav%20Function%20Hall!5e0!3m2!1sen!2sin'
          uploadLink='https://drive.google.com/drive/folders/1WYVg-t1wT0UA6gkyiu-L0OB_lKYfWbmA?usp=sharing'
          galleryLink='https://photos.app.goo.gl/wGdxgLtBZkmmKAgA6'
        />

        <Card
          title='Valima'
          date='8 June 2026 • 7:00 PM Insha Allah'
          venue='Sobha Square, Visakhapatnam'
          img='/Valima Card.png'
          mapLink='https://maps.app.goo.gl/4Yv58zrMYsmSjtfJ9'
          embed='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.2743644865054!2d83.18312267494198!3d17.684494583254185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39692262a40695%3A0xcb41735c1dfd47db!2sSobha%20Square!5e0!3m2!1sen!2sin'
          uploadLink='https://drive.google.com/drive/folders/1gt-IBievVrjmowdF094bH6Vr5z4tfa8e?usp=sharing'
          galleryLink='https://photos.app.goo.gl/KUjcP2Z5BSxwgHNA9'
        />

      </section>

    </div>
  );
}