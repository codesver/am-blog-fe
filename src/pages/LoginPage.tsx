import React, { useCallback, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

import useTheme, { Theme, ThemeType } from "../store/Theme";
import Auth, { Role } from "../core/Auth";
import Rest, { RestMethod, RestType } from "../core/Rest";
import { LoginResponse } from "../resources/ResponseDTO";

import Main from "../components/uixs/Main";

interface Account {
  username: string;
  password: string;
}

const LoginPage = () => {
  const theme = useTheme((state) => state.theme);
  const [account, setAccount] = useState({} as Account);
  const [valid, setValid] = useState<boolean>(true);

  const nav = useNavigate();

  const onUpdateAccount = useCallback(
    (changedAccount: Partial<Account>) => {
      setAccount({
        ...account,
        ...changedAccount,
      });
    },
    [account]
  );

  const accountValidation = useMemo(
    () => account.username && account.username.length >= 5 && account.password && account.password.length >= 5,
    [account]
  );

  const onRequestLogin = useCallback(() => {
    if (accountValidation) {
      Rest.send<LoginResponse>({
        method: RestMethod.POST,
        resource: "/login",
        body: account,
      }).then((res) => {
        if (res.type === RestType.SUCCESS) {
          const data = res.data;

          Auth.login({
            username: data.username,
            role: Role[data.role],
            token: data.token,
            expire: data.expire,
          });

          setValid(true);
          nav("/");
          return;
        }

        setValid(false);
      });
      return;
    }

    setValid(false);
  }, [account, nav]);

  return Auth.authenticated() ? (
    <Navigate to={"/"} />
  ) : (
    <LoginPageContainer className="LoginPage" $theme={theme}>
      <div className="login-wrapper">
        <div className="login-main">
          <Main size={7} />
        </div>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="login-input">
            <input
              className={valid ? "valid" : "invalid"}
              type="text"
              placeholder="Username 을 입력해주세요."
              onChange={(e) => onUpdateAccount({ username: e.target.value })}
            />
            <input
              className={valid ? "valid" : "invalid"}
              type="password"
              placeholder="Password 를 입력해주세요."
              autoComplete="on"
              onChange={(e) => onUpdateAccount({ password: e.target.value })}
            />
          </div>
          <div className="login-action">
            <button type="button" onClick={onRequestLogin}>
              LOGIN
            </button>
          </div>
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

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 50px;
    background-color: ${({ $theme }) => $theme.colors.base};
    box-shadow: ${({ $theme }) => {
      switch ($theme.type) {
        case ThemeType.LIGHT:
          return "20px 20px 60px #b1b1b1, -20px -20px 60px #efefef;";
        case ThemeType.DARK:
          return "20px 20px 60px #282828, -20px -20px 60px #363636;";
      }
    }};

    .login-main {
      width: 100%;
      height: 50%;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-form {
      width: 100%;
      height: 50%;

      display: flex;
      flex-direction: column;
      align-items: center;

      .login-input {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        & input {
          width: 250px;
          height: 30px;
          margin: 10px 0;
          padding: 10px;

          outline: none;
          border: none;
          border-radius: 10px;

          color: ${({ $theme }) => $theme.colors.unbase};
          background: ${({ $theme }) => $theme.colors.base};
          box-shadow: inset 5px 5px 17px
              ${({ $theme }) => {
                switch ($theme.type) {
                  case ThemeType.LIGHT:
                    return "#c8c8c8";
                  case ThemeType.DARK:
                    return "#282828";
                }
              }},
            inset -5px -5px 17px ${({ $theme }) => $theme.colors.base};

          transition: all 0.5s;
          font-family: "NanumSquareRound";
          font-weight: bold;
        }

        & input.invalid {
          color: ${({ $theme }) => $theme.colors.red};
        }

        & input.invalid::placeholder {
          color: ${({ $theme }) => $theme.colors.red};
        }
      }

      .login-action {
        width: 260px;
        display: flex;
        justify-content: center;

        & button {
          width: 50%;
          margin: 10px 0;
          padding: 10px;

          border: none;
          border-radius: 5px;

          text-decoration: none;
          font-family: "NanumSquareRound";
          font-weight: bold;

          color: ${({ $theme }) => $theme.colors.unbase};
          background-color: ${({ $theme }) => $theme.colors.base};

          cursor: pointer;
        }
      }
    }
  }
`;
