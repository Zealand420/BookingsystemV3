import React from 'react';

function MemberDetailsModal({ show, onClose, member }) {
  if (!show) return null;

  return (
    <div className="modal-overlay2">
      <div className="modal-container2">
        <div className="modal-content2 p-3">
          <button className="close-button2" onClick={onClose}>
            <i className="fas fa-times mt-2"></i>
          </button>
          <h2 className='text-custom-H2'>Medlemsdetaljer</h2>
          <div className="modal-body2">
            <p className='text-custom-primaryCTA'><strong>Navn:</strong> {member.FirstName} {member.LastName}</p>
            <p className='text-custom-primaryCTA'><strong>Telefon nr.:</strong> {member.PhoneNumber}</p>
            <p className='text-custom-primaryCTA'><strong>Klub:</strong> {member.FootballClub}</p>
            <p className='text-custom-primaryCTA'><strong>Rolle:</strong> {member.Role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetailsModal;




