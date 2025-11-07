import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import FormInput from "./FormInput";
import ActionButton from "./ActionButton";

const PasswordResetModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError("Email is required");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email address is invalid");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
              <Icon name="KeyRound" className="h-6 w-6 text-primary-600" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Reset your password
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
            </div>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="mt-5 sm:mt-6">
              <FormInput
                label="Email address"
                type="email"
                name="resetEmail"
                id="resetEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                error={error}
                required
                autoFocus
              />
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <ActionButton
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Send reset link
                </ActionButton>
                <ActionButton
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </ActionButton>
              </div>
            </form>
          ) : (
            <div className="mt-5 sm:mt-6">
              <div className="rounded-md bg-green-50 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Icon name="CheckCircle" className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Password reset link sent successfully
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                We've sent a password reset link to <span className="font-medium">{email}</span>. 
                Please check your email and follow the instructions to reset your password.
              </p>
              <ActionButton
                type="button"
                fullWidth
                onClick={onClose}
              >
                Close
              </ActionButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetModal;