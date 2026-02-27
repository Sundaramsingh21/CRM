import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const BackendURL = "http://localhost:5000"
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [token, settoken] = useState(null)
    const [authLoading, setAuthLoading] = useState(true);
    //dashboad states
    const [dashboardOverview, setDashboardOverview] = useState(null);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [salesPerformance, setSalesPerformance] = useState([]);
    const [dashboardLoading, setDashboardLoading] = useState(false);

    //leads states
    const [leads, setLeads] = useState([]);
    const [leadsPagination, setLeadsPagination] = useState(null);
    const [leadsLoading, setLeadsLoading] = useState(false);

    //deals states
    const [deals, setDeals] = useState([]);
    const [dealsLoading, setDealsLoading] = useState(false);
    const [dealsPagination, setDealsPagination] = useState(null);

    //activity states
    const [activities, setActivities] = useState([]);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);
        const token = localStorage.getItem("token");
        if (token) settoken(token);

        setAuthLoading(false);
    }, []);


    //auth Api's
    const login = async (data) => {
        try {
            const res = await axios.post(`${BackendURL}/api/auth/login`, data);

            if (res.data?.status) {

                //Store token
                localStorage.setItem("token", res.data.token);

                //Store user object 
                const userData = {
                    name: res.data.name,
                    role: JSON.parse(atob(res.data.token.split(".")[1])).role,
                    status: JSON.parse(atob(res.data.token.split(".")[1])).status,
                };

                localStorage.setItem("user", JSON.stringify(userData));

                setUser(userData);
                settoken(res.data.token);

                toast.success(res.data.message || "Login successful");

                navigate("/");

            } else {
                toast.error(res.data?.message || "Login failed");
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    const register = async (data) => {
        try {
            const res = await axios.post(`${BackendURL}/api/auth/register`, data);

            if (res.data?.status) {
                toast.success(res.data.message || "Registration successful, Wating for admin aproval");
                navigate("/login");
            } else {
                toast.error(res.data?.message || "Registration failed");
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        //Clear dashboard state
        setDashboardOverview(null);
        setMonthlyRevenue([]);
        setSalesPerformance([]);

        //Clear leads state
        setLeads([]);
        setLeadsPagination(null);
        navigate("/login");
    };

    //Dashboard api's
    const getDashboardData = async () => {
        try {
            setDashboardLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const overviewRes = await axios.get(
                `${BackendURL}/api/dashboard/overview`,
                config
            );

            const revenueRes = await axios.get(
                `${BackendURL}/api/dashboard/monthly-revenue`,
                config
            );

            setDashboardOverview(overviewRes.data);
            setMonthlyRevenue(revenueRes.data.monthlyRevenue);

            // Admin only
            if (user?.role === "admin") {
                const salesRes = await axios.get(
                    `${BackendURL}/api/dashboard/sales-performance`,
                    config
                );
                setSalesPerformance(salesRes.data.performance);
            }

        } catch (error) {
            console.error("Dashboard error:", error);
        } finally {
            setDashboardLoading(false);
        }
    };

    //lead api's
    const getLeads = async ({ page = 1, limit = 10, search = "", status = "" } = {}) => {
        try {
            setLeadsLoading(true);

            const res = await axios.get(`${BackendURL}/api/leads`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { page, limit, search, status },
            });

            if (res.data?.status) {
                setLeads(res.data.leads);
                setLeadsPagination(res.data.pagination);
            } else {
                toast.error(res.data.message || "Leads not featch")
            }
        } catch (error) {
            console.error("Fetch leads error:", error);
        } finally {
            setLeadsLoading(false);
        }
    };

    const createLead = async (data) => {
        try {
            const res = await axios.post(
                `${BackendURL}/api/leads`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.status) {
                toast.success(res.data.message || "Created Successfully")
                getLeads(); // refresh list
            } else {
                toast.error(res.data.message || "Creating new lead fail")
            }

        } catch (error) {
            console.error("Create lead error:", error);
        }
    };

    const updateLead = async (id, data) => {
        try {
            const res = await axios.put(
                `${BackendURL}/api/leads/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.status) {
                toast.success(res.data.message || "Updated Successfully")
                getLeads();
            } else {
                toast.error(res.data.message || "Something went wrong")
            }

        } catch (error) {
            console.error("Update lead error:", error);
        }
    };

    const deleteLead = async (id) => {
        try {
            const res = await axios.delete(
                `${BackendURL}/api/leads/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.status) {
                toast.success(res.data.message || "Deleted Successfully")
                getLeads();
            } else {
                toast.error(res.data.message || "Something went wrong")
            }

        } catch (error) {
            console.error("Delete lead error:", error);
        }
    };

    //Deals Api's
    const getDeals = async ({ page = 1, stage = "" } = {}) => {
        try {
            setDealsLoading(true);

            const res = await axios.get(`${BackendURL}/api/deals?page=${page}&stage=${stage}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data.status) {
                setDeals(res.data.deals);
                setDealsPagination(res.data.pagination);
            } else {
                toast.error(res.data.message || "Something went wrong")
            }

        } catch (error) {
            console.log(error);
        } finally {
            setDealsLoading(false);
        }
    };

    const createDeal = async (data) => {
        try {
            const res = await axios.post(
                `${BackendURL}/api/deals/add`,
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.status) {
                toast.success("Deal created successfully");
                getDeals();
            } else {
                toast.error(res.data.message || "Something went wrong")
            }
        } catch (error) {
            toast.error("Failed to create deal");
        }
    };

    const updateDeal = async (id, data) => {
        try {
            const res = await axios.put(
                `${BackendURL}/api/deals/${id}`,
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.status) {
                toast.success("Deal updated");
                getDeals();
                getDashboardData();
            } else {
                toast.error(res.data.message || "Something went wrong")
            }
        } catch (error) {
            toast.error("Failed to update deal");
        }
    };

    const deleteDeal = async (id) => {
        try {
            const res = await axios.delete(
                `${BackendURL}/api/deals/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.status) {
                toast.success("Deal deleted");
                getDeals();
            } else {
                toast.error(res.data.message || "Something went wrong")
            }
        } catch (error) {
            toast.error("Failed to delete deal");
        }
    };

    useEffect(() => {
        if (token) {
            getDashboardData();
            getLeads();
        }
    }, [token]);

    const value = {
        navigate,
        token,
        authLoading,
        user,
        login,
        register,
        logout,
        BackendURL,
        dashboardOverview,
        monthlyRevenue,
        salesPerformance,
        dashboardLoading,
        getDashboardData,
        leads,
        leadsPagination,
        leadsLoading,
        getLeads,
        createLead,
        updateLead,
        deleteLead,
        deals,
        dealsLoading,
        dealsPagination,
        getDeals,
        createDeal,
        updateDeal,
        deleteDeal,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}