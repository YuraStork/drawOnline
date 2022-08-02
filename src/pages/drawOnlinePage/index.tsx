import styled from "styled-components";
import { Canvas } from "../../components/canvas"
import { SettingsBar } from "../../components/settings"
import { Toolbar } from "../../components/toolbar"
import { PaintContext } from "../../context/paintContext";
import { useCanvas } from "../../hooks/canvas.hook";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


const Layout = styled.div`
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template: 50px 50px 1fr / 1fr;
`;

export const DrawOnlinePage = () => {
  const data = useCanvas();
  const params = useParams();
  const navigate = useNavigate();

  if (!params.id) navigate("/");
  return (
    <PaintContext.Provider value={{ ...data }}>
      <Layout>
        <Toolbar />
        <SettingsBar />
        <Canvas />
      </Layout>
    </PaintContext.Provider>
  )
}