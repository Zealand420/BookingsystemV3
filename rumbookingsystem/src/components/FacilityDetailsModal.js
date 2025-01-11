// components/FacilityDetailsModal.js
import React from "react";

function FacilityDetailsModal({ show, onClose, facility }) {
  if (!show) return null; // Don't render the modal if not visible.

  return (
    <div className="modal-overlay2">
      <div className="modal-container2">
        <div className="modal-content2 p-3">
          {/* Close button */}
          <button className="close-button2" onClick={onClose}>
            <i className="fas fa-times mt-2"></i> {/* "X" icon */}
          </button>
          <h2 className="text-custom-H2">Facility Details</h2>
          <div className="modal-body2">
            <p className="text-custom-primaryCTA"><strong>Name:</strong> {facility.RoomName}</p>
            <p className="text-custom-primaryCTA"><strong>Type:</strong> {facility.Type}</p>
            <p className="text-custom-primaryCTA"><strong>Status:</strong> {facility.Status}</p>
            <p className="text-custom-primaryCTA"><strong>Beskrivelse:</strong> {facility.Description}</p>
            {/* Add more fields if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityDetailsModal;
