'use client';

import { useUser } from "@/context/UserContext";
import { getOrdersByEmail } from "@/services/Order";
import { useEffect, useState } from "react";

const MyOrder = () => {
    const { user } = useUser();
    const email = user?.email;

    const [orderListing, setOrderListing] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // order data load
    useEffect(() => {
        if (email) {
            getOrdersByEmail(email)
                .then((data) => {
                    if (!data || data?.success === false) {
                        setError(data?.message || 'Failed to fetch user data');
                    } else {
                        setOrderListing(data.data);
                    }
                })
                .catch(() => setError('Failed to load profile.'))
                .finally(() => setLoading(false));
        }
    }, [email]);

    console.log(orderListing)

    return (
        <div>
            <h2>My Order Page..........</h2>
        </div>
    );
};

export default MyOrder;