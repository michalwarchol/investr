import { useEffect, useState } from "react";

import axios from "src/utils/axios";
import { useLoader } from "src/hooks/useLoader";
import { Tag } from "src/types/Tag";

import { IValues, initialValues } from "./NewProject.consts";
import NewProjectView from "./NewProject.view";
import { useSnackbar } from "src/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";

const NewProjectContainer = () => {
  const { showLoader, hideLoader } = useLoader();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);

  const getTags = async () => {
    showLoader();
    const tagsResult = await axios.get("tags");
    setTags(tagsResult.data);

    hideLoader();
  };

  const onSubmit = async (values: IValues) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("goal", values.goal.toString());
      formData.append("url", values.url);
      formData.append("contact_email", values.contact_email);
      formData.append("contact_phone", values.contact_phone);
      values.tags.forEach((tag, i) => {
        formData.append(`tags[${i}]`, tag);
      });
      formData.append("file", values.file!);

      await axios.post("products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showSnackbar("success", "Project has been added!");
      navigate("/");
    } catch (error) {
      showSnackbar("error", "Something went wrong");
    }
  };

  useEffect(() => {
    getTags();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <NewProjectView
      onSubmit={onSubmit}
      initialValues={initialValues}
      tags={tags}
      isEdit
    />
  );
};

export default NewProjectContainer;
