import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import constants from "../../utils/constants";
import Icon from "../../components/AppIcon";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const LandingPage = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-background text-gray-800 scroll-smooth overflow-x-hidden relative">
      {/* HEADER */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md backdrop-blur-sm bg-opacity-90"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/assets/logo/logo2.png"
              alt="FaceGuard Logo"
              className="h-10"
            />
            <span className="ml-3 text-2xl font-extrabold text-primary-700">
              FaceGuard
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
            <a
              href="#introduction"
              className="hover:text-primary-600 transition"
            >
              Introduction
            </a>
            <a
              href="#methodology"
              className="hover:text-primary-600 transition"
            >
              Methodology
            </a>
            <a href="#evaluation" className="hover:text-primary-600 transition">
              Evaluation
            </a>
            <a href="#about" className="hover:text-primary-600 transition">
              About
            </a>
          </nav>
          <Link
            to={constants.route.login}
            className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition font-semibold"
          >
            Try Demo
          </Link>
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 to-primary-100 text-center overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="container mx-auto px-6 relative z-10"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-primary-800 leading-tight"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Deep Fake Detection Platform
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl text-primary-700 max-w-3xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Powered by AI to protect digital trust and detect manipulation in
            images and videos.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-8"
          >
            <Link
              to={constants.route.login}
              className="bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-transform transform hover:scale-105 font-bold text-lg shadow-md"
            >
              Start Detection
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating background circles */}
        <motion.div
          className="absolute w-72 h-72 bg-primary-300 rounded-full blur-3xl opacity-30 top-10 left-10"
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-20 bottom-0 right-0"
          animate={{ y: [0, -40, 0], scale: [1, 1.05, 1], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
      </section>

      {/* INTRODUCTION */}
      <section id="introduction" className="py-20 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Deepfakes are AI-generated images and videos that alter facial
              expressions or voices to appear realistic. While used in media and
              entertainment, they pose significant threats such as
              misinformation, identity theft, and fraud. This project focuses on
              understanding and detecting deepfakes using modern machine
              learning techniques to promote digital security and trust.
            </p>
          </motion.div>
          <motion.img
            src="/assets/d2r.png"
            alt="Deepfake Intro"
            className="rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />
        </div>
      </section>

      {/* MOTIVATION & WHY */}
      <section className="py-20 bg-gray-50">
        <motion.div
          className="container mx-auto px-6 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Motivation & Why Deep Fake?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            {[
              {
                title: "Motivation",
                desc: "With the rapid growth of AI-generated content, detecting deepfakes has become essential. Misinformation, fraud, and online scams exploit manipulated media. This project aims to strengthen digital privacy and create awareness about AI misuse.",
              },
              {
                title: "Why Deep Fake?",
                desc: "Deepfakes are more realistic than ever and easily accessible to the public. They can harm reputations, spread false information, and manipulate politics. Detecting them helps maintain authenticity and trust in digital media.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-xl shadow-md"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-3 text-primary-700">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* OBJECTIVES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Objectives
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              "Study deepfake technology and its impact on society.",
              "Identify security and privacy risks of manipulated media.",
              "Develop AI-based detection models for accurate analysis.",
              "Promote safe and responsible AI use.",
            ].map((obj, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <Icon
                  name="Target"
                  className="w-10 h-10 mx-auto text-primary-600 mb-4"
                />
                <p className="text-gray-700">{obj}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20 bg-primary-50">
        <motion.div
          className="container mx-auto px-6 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Proposed Methodology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              [
                "Data Collection",
                "Gather real and fake images from open datasets.",
              ],
              [
                "Preprocessing",
                "Clean, normalize, and extract consistent image frames.",
              ],
              [
                "Feature Extraction",
                "Identify artifacts like unnatural expressions and blinking.",
              ],
              [
                "Model Training",
                "Train CNN/LSTM models for accurate classification.",
              ],
              [
                "Detection Phase",
                "Predict authenticity of uploaded media in real time.",
              ],
              [
                "Evaluation",
                "Measure performance using accuracy, precision, recall, and F1-score.",
              ],
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <div className="text-primary-600 text-3xl font-bold mb-2">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* EVALUATION */}
      <section id="evaluation" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Evaluation Parameters
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              [
                "Accuracy",
                "How correctly the model distinguishes real vs. fake.",
              ],
              ["Precision", "How many detected fakes are truly fake."],
              ["Recall", "The model’s ability to detect most fake images."],
              [
                "F1-Score",
                "Harmonic mean of precision and recall for balance.",
              ],
              [
                "Confusion Matrix",
                "Visual summary of correct/incorrect classifications.",
              ],
              ["Processing Time", "How quickly the model performs detection."],
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-2 text-primary-700">
                  {title}
                </h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONCLUSION */}
      <section className="py-20 bg-primary-100 text-center">
        <motion.div
          className="container mx-auto px-6 max-w-4xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Conclusion
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Deepfake detection plays a crucial role in maintaining online
            authenticity and preventing misuse of AI. Our approach demonstrates
            how preprocessing, feature extraction, and deep learning can
            effectively identify manipulated content. As AI advances, so must
            detection systems — promoting ethical, responsible, and secure
            digital interactions.
          </p>
        </motion.div>
      </section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gray-900 text-white py-10 text-center"
      >
        <div className="container mx-auto px-6">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} FaceGuard – All Rights Reserved.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Built by Team: Aryan, Smit, Nikhil, Vinit | Guided by Prof. Vivek H.
            Champaneria
          </p>
        </div>
      </motion.footer>

      {/* BACK TO TOP BUTTON */}
      {showTopButton && (
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, type: "spring" }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 hover:scale-110 transition z-50"
          whileHover={{ rotate: 360, scale: 1.1 }}
        >
          <Icon name="ArrowUp" className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
};

export default LandingPage;
