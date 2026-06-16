import MetricCard from "@/components/admin/statistics/MetricCard";
import PageLoader from "@/components/ui/PageLoader";
import { useGetStatisticsQuery } from "@/store/api/statistics.api";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const STATUS_CHART_COLORS = ["#DD6B20", "#319795", "#3182CE", "#805AD5", "#38A169", "#E53E3E"];
const ANALYTICS_CARD_COLORS = ["#9969FF", "#3182CE", "#38A169", "#DD6B20"];

const AdminDashboardPage = () => {
  const { data, isLoading } = useGetStatisticsQuery();

  if (isLoading) return <PageLoader />;

  return (
    <Stack gap="32px" width="full">
      <Heading size="2xl" color="#464646">
        DigiDive Control DashBoard
      </Heading>
      <Flex gap="6" wrap="wrap" width="full">
        {data?.mainMetrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            color={ANALYTICS_CARD_COLORS[index % ANALYTICS_CARD_COLORS.length]}
          />
        ))}
      </Flex>
      <Flex gap="6" direction={{ base: "column", xl: "row" }} width="full">
        <Box
          flex="2"
          bg="white"
          p="24px"
          borderRadius="16px"
          border="1px solid #E2E8F0"
          boxShadow="0 2px 12px rgba(0,0,0,0.01)"
          minH="380px"
        >
          <Text fontSize="18px" fontWeight="600" color="#464646" mb="6">
            Weekly Financial Growth ($)
          </Text>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.salesData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F5" />
              <XAxis dataKey="day" stroke="#A0AEC0" fontSize={12} tickLine={false} />
              <YAxis stroke="#A0AEC0" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ background: "#191D24", borderRadius: "8px", color: "white" }} />
              <Line type="monotone" dataKey="revenue" stroke="#9969FF" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box
          flex="1"
          bg="white"
          p="24px"
          borderRadius="16px"
          border="1px solid #E2E8F0"
          boxShadow="0 2px 12px rgba(0,0,0,0.01)"
          minH="380px"
        >
          <Text fontSize="18px" fontWeight="600" color="#464646" mb="6">
            Order Statuses Flow
          </Text>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data?.ordersDistribution}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {data?.ordersDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_CHART_COLORS[index % STATUS_CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
    </Stack>
  );
};

export default AdminDashboardPage;
