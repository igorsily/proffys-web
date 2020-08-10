import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import warningIcon from "../../assets/images/icons/warning.svg";
import Input from "../../components/Input";
import InputCellphone from "../../components/InputCellphone";
import InputPrice from "../../components/InputPrince";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import Textarea from "../../components/TextArea";
import api from "../../services/api";
import "./styles.css";

interface ScheduleItem {
  week_day: string;
  from: string;
  to: string;
}
const TeacherForm = () => {
  const { goBack } = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState<Array<ScheduleItem>>([
    { week_day: "", from: "", to: "" },
  ]);

  const addScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: "", from: "", to: "" }]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name,
      avatar,
      whatsapp: whatsapp.replace(/([\u0300-\u036f]|[^0-9])/g, ""),
      bio,
      subject,
      cost: cost.replace(/([\u0300-\u036f]|[^0-9])/g, ""),
      schedule: scheduleItems,
    };
    await api.post("classes", data);

    goBack();
  };

  const setScheduleItem = (position: number, field: string, value: string) => {
    const updatedSchedule = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });

    setScheduleItems(updatedSchedule);
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse fomulário de inscrição"
      />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <InputCellphone
              name="wp"
              label="WhastApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Geografia", label: "Geografia" },
              ]}
            />
            <InputPrice
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis{" "}
              <button type="button" onClick={addScheduleItem}>
                {" "}
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((schedule, index) => (
              <div key={schedule.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={schedule.week_day}
                  onChange={(e) =>
                    setScheduleItem(index, "week_day", e.target.value)
                  }
                  options={[
                    { value: "0", label: "Domingo" },
                    { value: "1", label: "Segunda-Feira" },
                    { value: "2", label: "Terça-feira" },
                    { value: "3", label: "Quarta-feira" },
                    { value: "4", label: "Quita-feira" },
                    { value: "5", label: "Sexta-feira" },
                    { value: "6", label: "Sábado" },
                  ]}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  onChange={(e) =>
                    setScheduleItem(index, "from", e.target.value)
                  }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  onChange={(e) => setScheduleItem(index, "to", e.target.value)}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante <br />
              Preencha todos os dados
            </p>
            <button type="submit">Finalizar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
