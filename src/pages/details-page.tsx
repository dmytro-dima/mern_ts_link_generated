import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import { Loader } from "../components/loader";
import { LinkCard } from "../components/link-card";
import { Container } from "@material-ui/core";

interface Params {
  id: string;
}

interface Link {
  clicks?: number;
  _id?: string;
  code?: string;
  to?: string;
  from?: string;
  owner?: string;
  date?: string;
}

export const DetailsPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState<Link>();
  const { id }: Params = useParams();

  const getLink = useCallback(async () => {
    try {
      return await request(`/api/link/${id}`, "GET", null, {
        Authorization: `Bearer: ${token}`,
      });
    } catch (e) {}
  }, [token, id, request]);

  useEffect(() => {
    getLink().then((data: Link) => setLink(data));
  }, [getLink]);

  return (
    <Container maxWidth="sm">
      {loading || link ? <LinkCard {...link} /> : <Loader />}
    </Container>
  );
};
