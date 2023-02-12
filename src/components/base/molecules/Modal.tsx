import { X } from 'lucide-react';

interface ModalProps {
  modalId: string;
  children: React.ReactNode;
}

export const Modal = ({ modalId, children }: ModalProps) => {
  return (
    <>
      <input id={modalId} type="checkbox" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={modalId}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            <X />
          </label>
          {children}
        </div>
      </div>
    </>
  );
};
