import MainGridContainer from "./Components/MainGridContainer";
import OrangeBox from "./Components/OrangeBox";

const MissionGuidelines = () => {
  return (
    <section className="w-full bg-black lg:bg-background border-t border-white/10 relative overflow-hidden h-screen">
      <div className="hidden md:block">
        <OrangeBox />
      </div>
      <MainGridContainer />
    </section>
  );
};

export default MissionGuidelines;
