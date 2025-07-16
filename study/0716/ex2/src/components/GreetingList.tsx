import { welcomeMessage } from "../data/messages";

const GreetingList = () => {
  return (
    <ul className="space-y-2">
      {welcomeMessage.map((msg, idx) => (
        <li key={idx} className="p-3 bg-blue-100 rounded shadow">
          {msg}
        </li>
      ))}
    </ul>
  );
};

export default GreetingList;
