export default function Join({ user, setUser }) {
  return (
    <input
      value={user}
      onInput={(e) => {
        setUser(e.target.value);
      }}
      placeholder="값을입력"
    ></input>
  );
}
