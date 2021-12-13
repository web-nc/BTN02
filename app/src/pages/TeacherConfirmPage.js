import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getPublicInfoCourse } from "../services/course";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/ConfirmPage/Teacher/ConfirmDialog";
import InvalidCode from "../components/ConfirmPage/InvalidCode";
import { Navigate } from "react-router-dom";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function TeacherConfirmPage() {
    const [alreadyIn, setAlreadyIn] = useState(false);
    const [invalidCode, setInvalidCode] = useState(false);
    const [course, setCourse] = useState({});
    const { id } = useParams();
    let query = useQuery(); //query.get('params')

    useEffect(() => {
      getPublicInfoCourse(id, query.get('inviteCode'), true).then((res) => {
        if (res.status === 200) {
          setCourse(res.data.payload);
        }
        if (res.status === 202) {
          switch (res.data.message) {
            case 'ALREADY_IN':
              toast.info('Bạn đã tham gia lớp học');
              setAlreadyIn(true);
              break;
            case 'INVALID_INVITE_CODE':
              setInvalidCode(true);
              break;
            default:
              toast.warning(res.data.message);
          }
        }
      });
    }, [id, query]);

    if (alreadyIn) {
      const redirURL = '/course/' + id + '/info';
      return (<Navigate to={redirURL} />);
    }

    if (invalidCode) {
      return <InvalidCode />
    }
    return (
        <ConfirmDialog course={course} inviteCode={query.get('inviteCode')} />
    );
}

export default TeacherConfirmPage;