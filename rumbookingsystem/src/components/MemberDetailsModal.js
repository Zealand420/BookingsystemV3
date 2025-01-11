// components/MemberDetailsModal.js
import React from 'react';

function MemberDetailsModal({ show, onClose, member }) {
  if (!show) return null; // Don't render the modal if not visible.

  return (
    <div className="modal-overlay2">
      <div className="modal-container2">
        <div className="modal-content2 p-3">
          {/* Close button inside the modal box */}
          <button className="close-button2" onClick={onClose}>
            <i className="fas fa-times mt-2"></i> {/* "X" icon */}
          </button>
          <h2>Medlemsdetaljer</h2>
          <div className="modal-body2">
            <p><strong>Navn:</strong> {member.FirstName} {member.LastName}</p>
            <p><strong>Telefon nr.:</strong> {member.PhoneNumber}</p>
            <p><strong>Klub:</strong> {member.FootballClub}</p>
            <p><strong>Rolle:</strong> {member.Role}</p>
            {/* Add other member details here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetailsModal;




