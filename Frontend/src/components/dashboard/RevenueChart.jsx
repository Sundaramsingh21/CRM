import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const RevenueChart = ({ data }) => {

    const formattedData = data?.map((item) => ({
        month: `${item._id.month}/${item._id.year}`,
        revenue: item.totalRevenue,
    }));

    return (
        <div className="w-full h-80">
            <ResponsiveContainer>
                <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;