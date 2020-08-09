import React, { useEffect } from "react";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";
import "./styles.css";

export interface Teacher {
  id: number;
  bio: string;
  cost: string;
  name: string;
  subject: string;
  whatsapp: string;
  avatar: string;
  user_id: number;
}
interface TeacherItemProps {
  teacher: Teacher;
}
const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  useEffect(() => {
    api.post("connections", { user_id: teacher.user_id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a href={`https://wa.me/${teacher.whatsapp}`}>
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
