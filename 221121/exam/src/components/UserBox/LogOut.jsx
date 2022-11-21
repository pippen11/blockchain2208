export default function Logout({ user, setUser }) {
  return (
    <div>
      {!user || `${user}님 어서오세요`}
      {/*  {!user?`${user}님어서오세요.`:"" */}
      {/* ||는 "또는" 앞에것이 거짓이면 뒤에걸 띄운다(출력한다). */}
      <button
        onClick={() => {
          setUser("");
        }}
      >
        Logout
      </button>
    </div>
  );
}
