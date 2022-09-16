import { Link, useNavigate } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { COUNTRY_DETAILS, COUNTRY_LIST } from "../routes";
import "./Header.scss";

type FormData = {
  code: string,
};

const Header = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      code: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = ({ code }) => {
    navigate(`/${COUNTRY_DETAILS.replace(':code', code.toUpperCase())}`);
    reset();
  }

  const onError: SubmitErrorHandler<FormData> = (err) => {
    console.log(err); // eslint-disable-line no-console
  }

  return (
    <header>
      <nav className="navbar navbar-expand-sm bg-dark header">
        <div className="container-fluid">
          <Link className="navbar-brand text-light flex-grow-1" to={COUNTRY_LIST}>Countries App</Link>
          <Link to={COUNTRY_LIST}>
            <button
              type="button"
              className="btn btn-outline-light me-2"
            >
              List
            </button>
          </Link>
          <form role="search" onSubmit={handleSubmit(onSubmit, onError)}>
            <input
              type="search"
              className="form-control me-2 find-by-code"
              placeholder="Find by code"
              aria-label="Find by code"
              maxLength={2}
              required
              {...register('code', { required: true, maxLength: 2 })}
            />
            <button type="submit" className="btn btn-primary">Go</button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
