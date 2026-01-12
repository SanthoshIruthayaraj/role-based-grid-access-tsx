import React, { useState, useEffect, useRef, type JSX } from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import type { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { DEMO_ACCOUNTS } from '../common/grid-config';
import type { LoginProps, LoginCredentials } from '../types/app-types';
import '../styles/Login.css';

export default function Login({ onLogin }: LoginProps): JSX.Element {
  const [credentials, setCredentials] = useState<LoginCredentials>({ userId: '', password: '' });
  const [error, setError] = useState('');
  const userInputRef = useRef<TextBoxComponent | null>(null);
  const passwordInputRef = useRef<TextBoxComponent | null>(null);

  useEffect(() => {
    const attachIcon = (textboxRef: React.RefObject<TextBoxComponent>, iconCss: string): void => {
      const instance = textboxRef.current;
      const inputWrapper = instance?.element?.parentElement;

      if (instance && inputWrapper?.parentElement && !inputWrapper.parentElement.querySelector('.e-icons')) {
        instance.addIcon('prepend', iconCss);
      }
    };

    attachIcon(userInputRef as any, 'e-icons e-user');
    attachIcon(passwordInputRef as any, 'e-icons e-lock');
  }, []);

  const handleFormSubmit = (event?: React.FormEvent<HTMLFormElement>): void => {
    event?.preventDefault();
  };

  const handleSubmit = (_args: React.MouseEvent<HTMLButtonElement>): void => {
    const trimmedUser = credentials.userId.trim();
    const trimmedPass = credentials.password.trim();

    if (!trimmedUser || !trimmedPass) {
      setError('Please enter both the User ID and Password.');
      return;
    }

    const matchedAccount = DEMO_ACCOUNTS.find(
      (account) => account.userId === trimmedUser && account.password === trimmedPass
    );

    if (!matchedAccount) {
      setError('Invalid credentials. Please check your user id and password.');
      return;
    }

    setError('');
    onLogin({ role: matchedAccount.role, userId: matchedAccount.userId });
  }

  const handleUserChange = (args: ChangeEventArgs): void => {
    setCredentials((current) => ({
      ...current,
      userId: typeof args.value === 'string' ? args.value : '',
    }));
  };

  const handlePasswordChange = (args: ChangeEventArgs): void => {
    setCredentials((current) => ({
      ...current,
      password: typeof args.value === 'string' ? args.value : '',
    }));
  };

  return (
    <div className="login-screen">
      <div className="card shadow-sm login-card">
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">Sign in</h2>

          <form className="d-grid gap-3" onSubmit={handleFormSubmit}>
            <div className="form-field-inline">
              <label htmlFor="userId" className="form-label form-label-inline">
                Email: <span className="field-accent" />
              </label>
              <TextBoxComponent
                id="userId"
                placeholder="Enter your email"
                value={credentials.userId}
                ref={userInputRef}
                change={handleUserChange}
              />
            </div>

            <div className="form-field-inline">
              <label htmlFor="password" className="form-label form-label-inline">
                Password: <span className="field-accent" />
              </label>
              <TextBoxComponent
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                ref={passwordInputRef}
                change={handlePasswordChange}
              />
            </div>

            {error && <div className="alert alert-danger py-2 small mb-0">{error}</div>}

            <div className="login-actions">
              <ButtonComponent
                type="submit"
                isPrimary
                cssClass="login-submit-btn"
                onClick={handleSubmit}
              >
                Login
              </ButtonComponent>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}