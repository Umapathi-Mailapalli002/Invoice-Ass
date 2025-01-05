import React, { useState } from "react";
import { Button, Navbar, Modal, SignupModal, LoginModal } from "../../components/index";

const Hero = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Navbar modeChange={true} />
      <Modal
        isOpen={isOpenForm}
        onClose={() => setIsOpenForm(false)}
        className="p-2 w-11/12 sm:w-7/12 lg:w-5/12 bg-transparent dark:bg-transparent border-none shadow-none relative"
      >
        {isLogin ? (
          <LoginModal onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupModal onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </Modal>

      <div className="relative bg-gradient-to-br from-blue-200 via-cyan-100 to-blue-300 text-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-gray-100 min-h-screen flex items-center justify-center px-6 sm:px-12">
        {/* Left Content */}
        <div className="max-w-3xl text-center sm:text-left z-10">
          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-transparent bg-clip-text dark:from-indigo-400 dark:via-purple-500 dark:to-pink-500">
              Streamline Your Sales,
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 text-transparent bg-clip-text dark:from-yellow-400 dark:via-orange-500 dark:to-red-500">
              Simplify Invoice Management.
            </span>
          </h1>
          {/* Subheadline */}
          <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 opacity-90">
            Empower your business with an intuitive platform to manage sales,
            track invoices, and enhance productivity. Everything you need in one place.
          </p>
          {/* Call to Action */}
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Button
              onClick={() => setIsOpenForm(true)}
              className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold shadow-lg hover:opacity-90 transition dark:from-green-400 dark:via-teal-500 dark:to-blue-500"
            >
              Get Started
            </Button>
            <button className="bg-transparent border-2 border-gray-400 text-blue-400 px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
              Learn More
            </button>
          </div>
        </div>
        {/* Background Design Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-blue-400 opacity-30 blur-3xl dark:bg-indigo-600 dark:opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-teal-400 opacity-30 blur-3xl dark:bg-purple-600 dark:opacity-20"></div>
      </div>
    </>
  );
};

export default Hero;
