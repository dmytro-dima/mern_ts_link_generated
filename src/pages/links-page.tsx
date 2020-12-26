import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import { Loader } from "../components/loader";
import { Typography, Container } from "@material-ui/core";
import { TableLinks } from "../components/table-links";

interface IParams {
  id: string;
}

interface ILink {
  clicks?: number;
  _id?: string;
  code?: string;
  to?: string;
  from?: string;
  owner?: string;
  date?: string;
}

export const LinksPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading, error } = useHttp();
  const [links, setLinks] = useState<ILink[]>([]);
  const { id }: IParams = useParams();

  const getLinks = useCallback(async () => {
    try {
      return await request(`/api/link`, "GET", null, {
        Authorization: `Bearer: ${token}`,
      });
    } catch (e) {}
  }, [token, id, request]);

  useEffect(() => {
    getLinks().then((data: ILink[]) => setLinks(data));
  }, [getLinks]);

  if (loading) return <Loader />;
  if (error) return <Typography align="center">{error}</Typography>;

  return (
    <Container maxWidth="md" className="mt-5">
      {links.length < 1 ? (
        <h1>Посиланя відсутні</h1>
      ) : (
        <TableLinks links={links} />
      )}
    </Container>
  );
};
