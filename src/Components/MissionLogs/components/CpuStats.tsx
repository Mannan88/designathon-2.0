import AnimatedLoader from "./AnimatedLoader";

const CpuStats = () => {
  return (
 <div className="font-octo text-[8px] font-medium text-white/70 leading-[1.2]">
  <div className="flex items-center gap-2">
    <span className="whitespace-nowrap">
      Creativity Flow: <span className="text-white">18%</span>
    </span>
    <div className="h-1.5 flex-1 bg-white/10  overflow-hidden">
      <AnimatedLoader min={0} max={100} interval={400} color="bg-accent" />
    </div>
  </div>

  <div className="flex justify-between">
    <span>
      Ideas Sparked: <span className="text-white">107</span>
    </span>
    <span>
      Prototypes Running: <span className="text-white">0</span>
    </span>
  </div>

  <div className="border-t border-white/10 my-1.5" />

  <div>Design Systems:</div>
  <div className="flex items-center gap-2">
    <span className="whitespace-nowrap">/ 30.2GiB/57.8GiB Assets</span>
    <div className="h-1.5 flex-1 bg-white/10  overflow-hidden">
      <AnimatedLoader min={40} max={65} interval={1500} color="bg-white" />
    </div>
  </div>

  <div>Collaboration:</div>
  <div className="flex justify-between">
    <span>
      Uploads: <span className="text-white">19B</span>
    </span>
    <span>
      Downloads: <span className="text-white">2kB</span>
    </span>
  </div>

  <div className="border-t border-white/10 my-1.5" />

  <table className="w-full text-left text-[9px]">
    <thead>
      <tr className="text-white/40">
        <td className="pr-2">Tool</td>
        <td className="text-right pr-2">Session ID</td>
        <td className="text-right pr-2">Focus%</td>
        <td className="text-right">Impact%</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="pr-2">Sketchpad</td>
        <td className="text-right pr-2 text-white">1543</td>
        <td className="text-right pr-2">4.57</td>
        <td className="text-right">0.86</td>
      </tr>
      <tr>
        <td className="pr-2">Whiteboard</td>
        <td className="text-right pr-2 text-white">582</td>
        <td className="text-right pr-2">3.56</td>
        <td className="text-right">1.10</td>
      </tr>
      <tr className="text-accent">
        <td className="pr-2">Figma</td>
        <td className="text-right pr-2">762</td>
        <td className="text-right pr-2">2.54</td>
        <td className="text-right">21.59</td>
      </tr>
      <tr>
        <td className="pr-2">Conky Dashboard</td>
        <td className="text-right pr-2 text-white">1535</td>
        <td className="text-right pr-2">1.02</td>
        <td className="text-right">0.27</td>
      </tr>
    </tbody>
  </table>
</div>
  );
};

export default CpuStats;
