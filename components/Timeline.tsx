const Divider = () => {
  return (
    <div className="w-full my-8 border border-gray-200 dark:border-gray-600" />
  );
};

const Year = ({children}) => {
  return (
    <h3 className="mb-4 text-lg font-bold tracking-tight text-gray-900 md:text-xl dark:text-gray-100">
      {children}
    </h3>
  );
};

const Step = ({title, children}) => {
  return (
    <li className="mb-4 ml-2">
      <div className="flex items-center mb-2 text-green-700 dark:text-green-300">
        <span className="sr-only">Check</span>
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </g>
        </svg>
        <p className="font-medium text-gray-900 dark:text-gray-100">{title}</p>
      </div>
      <p className="ml-6 text-gray-700 dark:text-gray-100">{children}</p>
    </li>
  );
};

export default function Timeline() {
  return (
    <>
      <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
        Timeline
      </h3>
      <Year>2021</Year>
      <ul>
        <Step title="Senior frontend developer at KVK">
          Worked on the online platform for the Dutch Chamber Of Commerce.
        </Step>
        <Step title="Back at HeadFWD">
          Became a fullstack developer at a medium consultant agency.
        </Step>
        <Step title="Hardware programming">
          I always wanted to learn more about memory, so I started hardware
          programming in Rust and Arduino.
        </Step>
      </ul>
      <Divider />
      <Year>2020</Year>
      <ul>
        <Step title="Joined MoneyMonk">Came back to the MoneyMonk team.</Step>
        <Step title="Moved to Indonesia 🇮🇩">
          Before COVID-19 I moved to Indonesia. Unfortunatley, I had to move
          back.
        </Step>
        <Step title="Helped introduce Shape Up 👨🏻‍💻">
          At the end of the year I got the upportunity to help introducing Shape
          Up and shape the process within the company
        </Step>
      </ul>
      <Divider />
    </>
  );
}
