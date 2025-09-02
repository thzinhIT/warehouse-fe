const EmptyDataChart = ({ size }: { size: number }) => {
  return (
    <div
      style={{ height: `${size}px` }}
      className="text-gray-400 flex items-center justify-center"
    >
      Không có dữ liệu
    </div>
  );
};

export default EmptyDataChart;
