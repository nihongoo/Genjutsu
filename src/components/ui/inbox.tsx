import { useEffect, useState } from "react";


type InboxProps = {
  visible: boolean;
  setVisible: (v: boolean) => void;
};

export const Inbox = ({ visible, setVisible }: InboxProps) => {
  const [localVisible, setLocalVisible] = useState(false);

  useEffect(() => {
    setLocalVisible(visible);
  }, [visible]);

  const notifications = [
    {
      id: 1,
      title: "System",
      message: "Taskbar settings updated",
      time: "now",
      icon: "",
    },
    {
      id: 2,
      title: "System",
      message: "All windows have been closed",
      time: "2m ago",
      icon: "",
    },
  ];

  return (
    <div
      className={`fixed w-[320px] bottom-12 right-5 
      transition-all duration-300 ease-out
      ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
      `}
    >
      <div className="rounded-2xl shadow-2xl backdrop-blur-md bg-white/20 dark:bg-[#2b2b2b]/80 border border-gray-200 dark:border-gray-700 overflow-hidden">
        
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span className="text-sm font-semibold text-[#FA5252] dark:text-[#FA5252]">
            Notifications
          </span>
          <button
            onClick={() => setVisible(false)}
            className="text-xs text-[#FA5252] "
          >
            Clear all
          </button>
        </div>

        {/* List */}
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 px-4 py-3 hover:bg-black/20 dark:hover:bg-[#3a3a3a] transition"
            >
              {/* Icon */}
              <div className="text-xl">{item.icon}</div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-[#FA5252] dark:text-[#FA5252]">
                    {item.title}
                  </span>
                  <span className="text-xs text-[#FA5252] dark:text-[#FA5252]">
                    {item.time}
                  </span>
                </div>

                <div className="text-sm text-[#FA5252] dark:text-[#FA5252]">
                  {item.message}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Inbox;