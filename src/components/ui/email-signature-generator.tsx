"use client";
// @ts-nocheck
import React, { useState, useRef } from "react";

const EmailSignatureGenerator = () => {
  const [name, setName] = useState("Your name");
  const [position, setPosition] = useState("Your role");
  const [email, setEmail] = useState("youremail@walkway.ai");
  const [website, setWebsite] = useState("walkway.ai");
  const [tagline, setTagline] = useState("Option1");
  const [logoColor, setLogoColor] = useState("#8547E6");

  const signatureContainer = useRef<HTMLDivElement>(null);

  const handleCopyToClipboard = () => {
    if (signatureContainer?.current) {
      // Create a selection to copy the HTML content
      const range = document.createRange();
      range.selectNode(signatureContainer.current);

      const selection = window.getSelection();
      if (selection) {
        // Clear any existing selections
        selection.removeAllRanges();
        // Add our new selection
        selection.addRange(range);

        try {
          // Execute copy command
          const successful = document.execCommand("copy");

          if (successful) {
            // Show success message
            alert(
              "Signature copied to clipboard! Paste it into Gmail's signature editor."
            );
          } else {
            throw new Error("Copy command was unsuccessful");
          }
        } catch (err) {
          // Fallback for modern browsers using Clipboard API
          try {
            const htmlContent = signatureContainer.current.outerHTML;

            // Create a blob with HTML mime type
            const htmlBlob = new Blob([htmlContent], { type: "text/html" });

            // Create a clipboard item with HTML content
            const clipboardItem = new ClipboardItem({
              "text/html": htmlBlob,
            });

            // Use modern Clipboard API
            navigator.clipboard
              .write([clipboardItem])
              .then(() =>
                alert(
                  "Signature copied to clipboard! Paste it into Gmail's signature editor."
                )
              )
              .catch((e) => alert("Couldn't copy signature: " + e.message));
          } catch (err) {
            alert(
              "Unable to copy signature to clipboard. Please try a different browser."
            );
          }
        } finally {
          // Clear the selection
          selection.removeAllRanges();
        }
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl m-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Edit Panel */}
      <div className="w-full md:w-1/2 p-6 bg-gray-50 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Edit Your Signature
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Footer
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="tagline-option1"
                name="tagline"
                value="Option1"
                checked={tagline === "Option1"}
                onChange={(e) => setTagline(e.target.value)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              />
              <label
                htmlFor="tagline-option1"
                className="ml-2 block text-sm text-gray-700"
              >
                Tagline
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="tagline-option2"
                name="tagline"
                value="Option2"
                checked={tagline === "Option2"}
                onChange={(e) => setTagline(e.target.value)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              />
              <label
                htmlFor="tagline-option2"
                className="ml-2 block text-sm text-gray-700"
              >
                Decorative image
              </label>
            </div>
          </div>
        </div>

        <div className="mb-6 sr-only">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo Color
          </label>
          <input
            type="color"
            value={logoColor}
            onChange={(e) => setLogoColor(e.target.value)}
            className="w-12 h-8 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={handleCopyToClipboard}
          className="w-full bg-violet-600 text-white py-2 px-4 rounded-full hover:bg-violet-500 transition duration-300 font-semibold tracking-tight"
          type="button"
        >
          Copy Signature to Clipboard
        </button>
      </div>

      {/* Preview Panel */}
      <div className="w-full md:w-1/2 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Signature Preview
        </h2>

        <div className="flex-grow flex items-center justify-center bg-white p-4 border border-gray-200 rounded-md">
          <div
            id="signature-preview"
            className="max-w-md"
            ref={signatureContainer}
          >
            <div
              style={{
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "14px",
                lineHeight: "1.5",
                color: "#333",
              }}
            >
              {/* Logo */}
              <div style={{ marginBottom: "16px" }}>
                <img
                  src="https://www.walkway.ai/images/walkway-logotype-2x.jpg"
                  width={148}
                  height={49}
                  alt="Walkway "
                  style={{ border: "none", display: "block", lineHeight: "0" }}
                />
              </div>

              {/* Name and Position */}
              <div style={{ marginBottom: "8px" }}>
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {name}
                </div>
                <div style={{ color: "#666" }}>{position}</div>
              </div>

              {/* Contact Info */}
              <div style={{ marginBottom: "16px" }}>
                <div>
                  <a
                    href={`mailto:${email}`}
                    style={{ color: logoColor, textDecoration: "none" }}
                  >
                    {email}
                  </a>
                </div>
                <div>
                  <a
                    href={`https://${website}`}
                    style={{ color: logoColor, textDecoration: "none" }}
                  >
                    {website}
                  </a>
                </div>
              </div>

              {/* Decorative Image */}
              <div style={{ marginTop: "16px", textAlign: "right" }}>
                <div style={{ fontWeight: "bold" }}>
                  {tagline === "Option1" ? (
                    <img
                      src="https://www.walkway.ai/images/walkway-tagline.jpg"
                      width={265}
                      height={107}
                      alt="Walkway.ai"
                      style={{
                        border: "none",
                        display: "block",
                        lineHeight: "0",
                      }}
                    />
                  ) : (
                    <img
                      src="https://www.walkway.ai/images/walkway-tagline-2.jpg"
                      width={158}
                      height={80}
                      alt="Walkway.ai"
                      style={{
                        border: "none",
                        display: "block",
                        lineHeight: "0",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSignatureGenerator;
