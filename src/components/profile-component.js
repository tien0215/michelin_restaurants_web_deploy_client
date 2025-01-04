const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  return (
    <div style={{ padding: "3rem", fontFamily: "Inter" }}>
      {!currentUser && (
        <div>You must log in before accessing your personal information.</div>
      )}
      {currentUser && (
        <div>
          <h2>Here is your personal profile:</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Name：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>User ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Email Address: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Role: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
