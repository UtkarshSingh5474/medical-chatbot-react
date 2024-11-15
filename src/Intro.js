import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';


function Intro() {



  const container = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };





  return (
    <div id="services">
      <div className="container">
        <motion.h1 whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: -300, opacity: 0 }}
          transition={{ duration: 2 }} className="sub-title">Quick Guide</motion.h1>
        <div className="services-list" >

          <motion.div initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.3 }}>

            <i className="fa-solid fa-right-to-bracket"></i>
            <h2>Login/Signup</h2>
            <p>Sign in or Login into your account</p>
            <a href="#">learn more</a>
          </motion.div>
          <motion.div initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}>
            <i className="fa-solid fa-pen"></i>
            <h2>Medical History</h2>
            <p>Enter your Medical History and Age</p>
            <a href="#">learn more</a>
          </motion.div>
          <motion.div initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.7 }}>
            <i className="fa-brands fa-dochub"></i>
            <h2>Upload your Report</h2>
            <p>Upload your medical Report</p>
            <a href="#">learn more</a>
          </motion.div>
          <motion.div initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.9 }}>
            <i className="fa-brands fa-readme"></i>
            <h2>Analyze</h2>
            <p>Write Command Analyze in the chat box and ask any queries </p>
            <a href="#">learn more</a>
          </motion.div>


        </div>

      </div>

      <div className='ip'>
          <Link to="/Login">
        <input
          className={'inputButtonp'}
          type="button"
        //   onClick={handleLogin}
          value={'Continue'}
        />
        </Link>
        </div>

    </div>






  );
}

export default Intro;