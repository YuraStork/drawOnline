import { BurgerMenu } from "components/burger-menu";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logout } from "store/reducers/user.reducer";
import { useAppDispatch } from "store/store";
import { Container } from "../container/styles";
import { LINKS } from "./const";
import { HeaderComponent, BurgerWrapper, HeaderNavigation, HeaderUserBlock } from "./styles";

export const Header = () => {
  const dispatch = useAppDispatch();
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
          <button onClick={() => dispatch(logout())}>logout</button>
        </HeaderUserBlock>
      </Container>
    </HeaderComponent>
  );
};
