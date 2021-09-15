import { useState } from 'react';

export default function SignIn() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const target = e.target;

    switch (target.name) {
      case 'email':
        return setFormValues({ email: target.value, password: formValues.password });
      case 'password':
        return setFormValues({ email: formValues.email, password: target.value });
      default:
        throw new Error();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  }

  return (
    <div>
      <h2 className="page_title">SIGN IN</h2>
      <form className="form_container" onSubmit={(e) => handleSubmit(e)}>
        <div className="field_label">
          <span>Email:</span>
        </div>
        <input
          className="field_input"
          name="email"
          type="text"
          value={formValues.email}
          onChange={(e) => handleChange(e)} />
        <div className="field_label">
          Password:
        </div>
        <input
          className="field_input"
          name="password"
          type="text"
          value={formValues.password}
          onChange={(e) => handleChange(e)} />
        <input className="button" type="submit" value="Sign In" />
      </form>
    </div>
  );
}