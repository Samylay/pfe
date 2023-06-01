import React from "react";
import { AiOutlineBarChart, AiOutlineStock } from "react-icons/ai";
import { FiHome, FiUserPlus, FiUsers } from "react-icons/fi";

export const adminLinks = [
  {
    title: "Dashboard",
    links: [
      {
        goto: "dashboard",
        name: "acceuil",
        icon: <FiHome />,
      },
    ],
  },
  {
    title: "Utilisateurs",
    links: [
      {
        goto: "dashboard/users",
        name: "Liste d'utilisateurs",
        icon: <FiUsers />,
      },
      {
        goto: "dashboard/register",
        name: "Ajouter un utilisateur",
        icon: <FiUserPlus />,
      },
      {
        goto: "dashboard/adduser",
        name: "Demandes d'inscription",
        icon: <FiUserPlus />,
      },
    ],
  },
  {
    title: "Indicateurs",
    links: [
      {
        goto: "dashboard/kpi",
        name: "nom kpi 1",
        icon: <AiOutlineStock />,
      },
      {
        goto: "dashboard/kpi",
        name: "nom kpi 2",
        icon: <AiOutlineBarChart />,
      },
    ],
  },
];
export const userLinks = [
  {
    title: "Dashboard",
    links: [
      {
        goto: "dashboard",
        name: "acceuil",
        icon: <FiHome />,
      },
    ],
  },
  {
    title: "Indicateurs",
    links: [
      {
        goto:"dashboard/kpi",
        name: "nom kpi 1",
        icon: <AiOutlineStock />,
      },
      {
        goto:"dashboard/kpi",
        name: "nom kpi 2",
        icon: <AiOutlineBarChart />,
      },
    ],
  },
];
