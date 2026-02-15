import AnimatedLoader from "./AnimatedLoader";

// system resource stats panel
const CpuStats = () => {
  return (
    <div className="font-octo text-[10px] font-medium text-white/70 leading-[1.6]">
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">
          CPU usage: <span className="text-white">18%</span>
        </span>
        <div className="h-1.5 flex-1 bg-white/10 rounded-sm overflow-hidden">
          <AnimatedLoader min={0} max={100} interval={400} color="bg-accent" />
        </div>
      </div>
      <div className="flex justify-between">
        <span>
          Processes: <span className="text-white">107</span>
        </span>
        <span>
          Running: <span className="text-white">0</span>
        </span>
      </div>

      <div className="border-t border-white/10 my-1.5" />

      <div>File systems:</div>
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">/ 30.2GiB/57.8GiB</span>
        <div className="h-1.5 flex-1 bg-white/10 rounded-sm overflow-hidden">
          <AnimatedLoader min={40} max={65} interval={1500} color="bg-white" />
        </div>
      </div>
      <div>Networking:</div>
      <div className="flex justify-between">
        <span>
          Up: <span className="text-white">0B</span>
        </span>
        <span>
          - Down: <span className="text-white">0B</span>
        </span>
      </div>

      <div className="border-t border-white/10 my-1.5" />

      <table className="w-full text-left text-[9px]">
        <thead>
          <tr className="text-white/40">
            <td className="pr-2">Name</td>
            <td className="text-right pr-2">PID</td>
            <td className="text-right pr-2">CPU%</td>
            <td className="text-right">MEM%</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="pr-2">gnome.screensho</td>
            <td className="text-right pr-2 text-white">1543</td>
            <td className="text-right pr-2">4.57</td>
            <td className="text-right">0.86</td>
          </tr>
          <tr>
            <td className="pr-2">Xorg</td>
            <td className="text-right pr-2 text-white">582</td>
            <td className="text-right pr-2">3.56</td>
            <td className="text-right">1.10</td>
          </tr>
          <tr className="text-accent">
            <td className="pr-2">firefox</td>
            <td className="text-right pr-2">762</td>
            <td className="text-right pr-2">2.54</td>
            <td className="text-right">21.59</td>
          </tr>
          <tr>
            <td className="pr-2">conky</td>
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
