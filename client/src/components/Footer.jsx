import {FaLinkedin, FaGithub} from 'react-icons/fa';

export const Footer = () => {
  return (
    <div>
        <footer className="d-flex bg-dark justify-content-start align-items-center border-top border-1 border-secondary px-4 py-2">
            <a href='https://github.com/ferOlguiin' rel="noreferrer" target="_blank" className="my-0 me-1 p-0"><FaGithub className="text-white fs-2"/></a>
            <a href='https://www.linkedin.com/in/fernando-olguin-5a63a9236/' rel="noreferrer" target="_blank" className="m-0 p-0"><FaLinkedin className='text-primary bg-white rounded fs-2'/></a>
        </footer>
    </div>
  )
};

