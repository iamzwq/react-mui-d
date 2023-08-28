import { FC } from "react";
import { Outlet } from "react-router-dom";
import HomeHeader from "./components/Header";

const Home: FC = () => {
  return (
    <>
      <HomeHeader />
      <Outlet />
    </>
  );
};

export default Home;
