function Modal({ openModal, children, className = "" }) {
  if (openModal)
    return (
      <div
        className={`fixed inset-0 flex duration-300 text-[#000] ${className}`}
      >
        <div
          style={{ opacity: openModal ? 1 : 0 }}
          className={`appearBg shade absolute inset-0 bg-[#000000b8] transition-opacity duration-300`}
        />
        <div
          style={
            openModal
              ? { opacity: 1, transform: "scale(1)" }
              : { opacity: 0, transform: "scale(.9)" }
          }
          className={`appear modal min-w-[400px] bg-white p-3 rounded-xl m-auto transition-[opacity,transform] duration-300`}
        >
          {children}
        </div>
      </div>
    );
}

export default Modal;
