import { BurgerMenu } from "components/burger-menu";
import { WsContext } from "context/ws.context";
import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logoutAction } from "store/slices/user.slice";
import { useAppDispatch } from "store/store";
import { Container } from "../container/styles";
import { LINKS } from "./const";
import { HeaderComponent, BurgerWrapper, HeaderNavigation, HeaderUserBlock } from "./styles";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { socket } = useContext(WsContext);
  const { pathname } = useLocation();
  return (
    <HeaderComponent>
      <Container>
        <BurgerWrapper>
          <BurgerMenu list={LINKS} />
        </BurgerWrapper>

        <HeaderNavigation>
          <ul>
            {LINKS.map((link) => (
              <li key={link.url}>
                <NavLink to={link.url}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </HeaderNavigation>

        <HeaderUserBlock>
          {pathname !== "/cabinet" && <Link to="/cabinet">My Cabinet</Link>}
          <button onClick={() => { socket.disconnect(); dispatch(logoutAction()) }}>logout</button>
        </HeaderUserBlock>
      </Container>
    </HeaderComponent>
  );
};
