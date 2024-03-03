import React, { useCallback, useState } from "react";
import styled from "styled-components";

import useTheme, { Theme } from "../core/Theme";
import Main from "../components/uixs/Main";
import Rest, { RestMethod, RestType } from "../core/Rest";
import Auth from "../core/Auth";

interface Account {
  username: string;
  password: string;
}

const LoginPage = () => {
  const theme = useTheme((state) => state.theme);
  const login = Auth.login;
  const [account, setAccount] = useState({} as Account);

  const onUpdateAccount = useCallback(
    (changedAccount: Partial<Account>) => {
      setAccount({
        ...account,
        ...changedAccount,
      });
    },
    [account]
  );

  const onRequestLogin = useCallback(() => {
    Rest.send({
      method: RestMethod.POST,
      resource: "/login",
      body: account,
    }).then((res) => {
      if (res.type === RestType.SUCCESS) {
        console.log(res);
      }
    });
  }, [account]);

  return (
    <LoginPageContainer className="LoginPage" $theme={theme}>
      <div className="login-wrapper">
        <div className="login-main">
          <Main size={5} />
        </div>
        <form className="login-form">
          <div className="login-input">
            <input type="text" onChange={(e) => onUpdateAccount({ username: e.target.value })} />
            <input type="password" autoComplete="on" onChange={(e) => onUpdateAccount({ password: e.target.value })} />
          </div>
          <button onClick={onRequestLogin}>Login</button>
        </form>
      </div>
    </LoginPageContainer>
  );
};

export default React.memo(LoginPage);

interface StyledProps {
  $theme: Theme;
}

const LoginPageContainer = styled.div<StyledProps>`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ $theme }) => $theme.colors.base};

  .login-wrapper {
    width: 500px;
    height: 500px;

    border-radius: 50px;

    background-color: ${({ $theme }) => $theme.colors.base};
  }
`;
