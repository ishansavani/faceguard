import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Utils from "../../utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Moon,
  Sun,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import constants from "../../utils/constants";

const DeepFakeAnalysis = () => {
  const { setStore, apiRequest, store } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [result, setResult] = useState(null);

  // Load dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      handleFileChange({ target: { files: [droppedFile] } });
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // Run detection
  const runDetection = async () => {
    if (!file) return;

    setDetecting(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await apiRequest({
        method: "POST",
        url: constants.api.deepfakeAnalysis,
        data: formData,
        onSuccess: (res) => {
          setResult(res.data);
        },
        onError: (err) => {
          setError(err.message);
        },
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Is the backend running?");
    } finally {
      setDetecting(false);
    }
  };

  useEffect(() => {
    setStore({
      headerData: {
        title: `Welcome, ${Utils.getNameFromEmail(store?.userdata?.email)}`,
        icon: "Hand",
      },
    });
  }, [store?.userdata?.email, setStore]);

  const formatPercent = (value) => (value * 100).toFixed(2);

  return (
    <div
      className="transition-colors duration-300 bg-gray-900 rounded-2xl"
    >
      <div className="container mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Deepfake Detector
          </h1>
        </motion.div>

        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-700 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`border-3 border-dashed rounded-xl text-center cursor-pointer transition-all
              ${detecting ? "opacity-75" : ""}`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
              disabled={detecting}
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto max-h-64 rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="mx-auto w-16 h-16 text-blue-500" />
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-200">
                    Drop your image here or click to upload
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supports JPG, PNG, WebP • Max 10MB
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-300"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detect Button */}
          <motion.button
            whileHover={{ scale: file && !detecting ? 1.02 : 1 }}
            whileTap={{ scale: file && !detecting ? 0.98 : 1 }}
            onClick={runDetection}
            disabled={!file || detecting}
            className={`mt-6 w-full py-4 rounded-xl font-semibold text-lg transition-all
              ${
                file && !detecting
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {detecting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing Image...
              </span>
            ) : (
              "Detect Image"
            )}
          </motion.button>
        </motion.div>

        {/* Result Card */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mt-4"
            >
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-2xl font-bold ${
                    result.prediction === "real"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  {result.prediction === "real" ? (
                    <>
                      <CheckCircle2 className="w-8 h-8" />
                      Real Image
                    </>
                  ) : (
                    <>
                      <XCircle className="w-8 h-8" />
                      AI-Generated Image
                    </>
                  )}
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  <span>AI-Generated</span>
                  <span className="font-bold text-lg">
                    {formatPercent(result.probs.ai_generated)}% Confidence
                  </span>
                  <span>Real</span>
                </div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${formatPercent(result.probs.real)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${
                      result.prediction === "real"
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : "bg-gradient-to-r from-red-400 to-red-600"
                    }`}
                  />
                </div>
              </div>

              {/* Probabilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      AI-Generated
                    </span>
                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {formatPercent(result.probs.ai_generated)}%
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-xl border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Real
                    </span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatPercent(result.probs.real)}%
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setFile(null);
                  setImagePreview(null);
                  setResult(null);
                  setError(null);
                }}
                className="mt-6 w-full py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Analyze Another Image
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeepFakeAnalysis;
