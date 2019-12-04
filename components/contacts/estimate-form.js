import React, { useState, useContext, useEffect } from 'react';
import classnames from 'classnames';
import Checkbox from '../form/checkbox';
import { ContactUsContext } from '../context/contacts-context';
import FileUpload from '../form/upload-file-btn';

const EstimateForm = () => {
  const [stage, setStage] = useState({
    value: null,
    error: false,
  });
  const [services, setServices] = useState({
    value: [],
    error: false,
  });
  const [pm, setPm] = useState({
    value: null,
    error: false,
  });
  const [budget, setBudget] = useState({
    value: '',
    error: false,
  });
  const [timeframe, setTimeframe] = useState({
    value: '',
    error: false,
  });
  const [start, setStart] = useState({
    value: '',
    error: false,
  });
  const [emailEstimate, setEmailEstimate] = useState({
    value: '',
    error: false,
  });
  const [messageEstimate, setMessageEstimate] = useState({
    value: '',
    error: false,
  });
  const [name, setName] = useState({
    value: '',
    error: false,
  });
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [wizardStage, setWizardStage] = useState(0);

  const [file, setFile] = useState({
    value: '',
    error: false,
  });
  const [fileName, setFileName] = useState('Attach you file');

  const {
    isPending,
    setIsPending,
    setNotifyMessage,
    setStatus,
    setWishlist,
    selectedCountry,
  } = useContext(ContactUsContext);

  useEffect(() => {
    setWishlist(
      [
        stage.value,
        ...services.value,
        pm.value,
        budget.value,
        timeframe.value,
        start.value,
      ].filter((item) => !!item),
    );
  }, [
    stage.value,
    services.value,
    pm.value,
    budget.value,
    timeframe.value,
    start.value,
  ]);

  function onSubmit(e) {
    e.preventDefault();

    setIsPending(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify({
      stage,
      services,
      pm,
      budget,
      timeframe,
      start,
      emailEstimate,
      messageEstimate,
      name,
      phoneEstimate: { value: '123456789', error: '' },
      isSubscriber,
      hasDiscount,
      selectedCountry,
    }));

    fetch('/estimate', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && json.errorField) {
          setNotifyMessage(json.status.toString());
        }

        setIsPending(false);
        setStatus(json.status.toString());

        if (json.status.toString() === 'Message sent') {
          // setInitialState();
        }
      });
  }

  function handleServicesChange(event) {
    if (event.target.checked) {
      setServices({
        value: [...services.value, event.target.value],
        error: false,
      });
      return;
    }

    setServices({
      value: services.value.filter((item) => item !== event.target.value),
      error: false,
    });
  }

  function wizardStageIncreaser() {
    setWizardStage(wizardStage + 1);
  }
  function wizardStageDecreaser() {
    setWizardStage(wizardStage - 1);
  }

  return (
    <div className="estimate-form form-container">
      <div className="progressbar-container">
        <ul className="progressbar">
          <li
            className={classnames({
              done: wizardStage > 0,
              active: wizardStage === 0,
            })}
          />
          <li
            className={classnames({
              done: wizardStage > 1,
              active: wizardStage === 1,
            })}
          />
          <li
            className={classnames({
              done: wizardStage > 2,
              active: wizardStage === 2,
            })}
          />
          <li
            className={classnames({
              done: wizardStage > 3,
              active: wizardStage === 3,
            })}
          />
        </ul>
      </div>
      <form onSubmit={onSubmit} className="estimate-form-inputs">
        {wizardStage === 0 && (
          <div className="wizard-stage">
            <div className="question-title mb-0">
              <span className="question-number">1.</span>
              {' '}
Stage
            </div>
            <div className="estimate-input-cols">
              <div className="standard-radio-input">
                <div className="radiogroup">
                  <span>
                    <input
                      name="stage"
                      type="radio"
                      value="New project"
                      id="new"
                      onChange={(event) => {
                        setStage({
                          value: event.target.value,
                          error: '',
                        });
                      }}
                      checked={stage.value === 'New project'}
                    />
                    <label htmlFor="new" className="label-for-radio-btn">
                      <b className="font-bold d-block">New project</b>
                      {' '}
                      <span className="text-dimmed">
                        to be built from scratch
                      </span>
                    </label>
                  </span>
                  <span>
                    <input
                      name="stage"
                      type="radio"
                      value="Ongoing project"
                      id="existing"
                      onChange={(event) => {
                        setStage({
                          value: event.target.value,
                          error: '',
                        });
                      }}
                      checked={stage.value === 'Ongoing project'}
                    />
                    <label htmlFor="existing" className="label-for-radio-btn">
                      <b className="font-bold d-block">Ongoing project</b>
                      <span className="text-dimmed">to continue development</span>
                    </label>
                  </span>
                  <span>
                    <input
                      name="stage"
                      type="radio"
                      value="Legacy project"
                      id="legacy"
                      onChange={(event) => {
                        setStage({
                          value: event.target.value,
                          error: '',
                        });
                      }}
                      checked={stage.value === 'Legacy project'}
                    />
                    <label htmlFor="legacy" className="label-for-radio-btn">
                      <b className="font-bold d-block">Legacy project</b>
                      <span className="text-dimmed">to continue development</span>
                    </label>
                  </span>
                </div>
              </div>
            </div>
            <div className="question-title">
              <span className="question-number">2.</span>
              {' '}
Services needed
            </div>
            <div className="estimate-input-cols">
              <p>Software development</p>
              <div className="options-wrapper">
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="Web"
                    name="services"
                    id="web"
                    value="Web app"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('Web app')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="Mobile"
                    name="services"
                    id="mobile"
                    value="Mobile app"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('Mobile app')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="PWA"
                    name="services"
                    id="pwa"
                    value="PWA"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('PWA')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="AMP"
                    name="services"
                    id="amp"
                    value="AMP"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('AMP')}
                  />
                </div>
              </div>
              <p>Other services</p>
              <div className="options-wrapper odd-options-number">
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="Team augmentation"
                    name="services"
                    id="еeam-enhancement"
                    value="Team enhancement"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('Team enhancement')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="UX/UI design"
                    name="services"
                    id="ui-ux-design"
                    value="UX/UI design"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('UX/UI design')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="MVP"
                    name="services"
                    id="mvp"
                    value="MVP"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('MVP')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="PoC"
                    name="services"
                    id="poc"
                    value="PoC"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('PoC')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="Tech support"
                    name="services"
                    id="tech-support"
                    value="Tech support"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('Tech support')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="Tech consultancy"
                    name="services"
                    id="tech-consultancy"
                    value="Tech consultancy"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('Tech consultancy')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="Chatbots"
                    name="services"
                    id="chatbots"
                    value="Chatbots"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('Chatbots')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="Programmable voice"
                    name="services"
                    id="programmable-voice"
                    value="Programmable voice"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('Programmable voice')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="IoT"
                    name="services"
                    id="iot"
                    value="IoT"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('IoT')}
                  />
                </div>
                <div className="input-checkbox-wrap">
                  <Checkbox
                    text="Other services"
                    name="services"
                    id="other-services"
                    value="Other services"
                    onChange={handleServicesChange}
                    isChecked={services.value.includes('Other services')}
                  />
                </div>
              </div>
            </div>
            <div className="wizard-stage-footer mt-auto">
              <button
                type="button"
                disabled={!stage.value || !services.value.length}
                className={`button button-send${
                  !stage.value || !services.value.length ? ' no-shadow pending' : ''
                }`}
                onClick={wizardStageIncreaser}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {wizardStage === 1 && (
          <div className="wizard-stage">
            <div className="question-title">
              <span className="question-number">3.</span>
              {' '}
Project management
            </div>
            <div className="estimate-input-cols">
              <p className="text-normal text-label">
                Do you require a product manager or a project manager,
                 who will save your time by describing, assigning, and prioritizing tasks?
              </p>
              <div className="options-wrapper odd-options-number">
                <div className="input-radio-wrap">
                  <input
                    name="isPMrequired"
                    type="radio"
                    value="Yes, I need project management"
                    id="iNeedPM"
                    onChange={(event) => {
                      setPm({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={pm.value === 'Yes, I need project management'}
                  />
                  <label htmlFor="iNeedPM" className="label-for-radio-btn">
                    Yes, I need project management
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="isPMrequired"
                    type="radio"
                    value="No, I do not need project management"
                    id="iDontNeedPM"
                    onChange={(event) => {
                      setPm({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={pm.value === 'No, I do not need project management'}
                  />
                  <label htmlFor="iDontNeedPM" className="label-for-radio-btn">
                    No, I do not need project management
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="isPMrequired"
                    type="radio"
                    value="I am not sure about project management"
                    id="notSureAboutPM"
                    onChange={(event) => {
                      setPm({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={pm.value === 'I am not sure about project management'}
                  />
                  <label
                    htmlFor="notSureAboutPM"
                    className="label-for-radio-btn"
                  >
                    I am not sure
                  </label>
                </div>
              </div>
            </div>
            <div className="question-title">
              <span className="question-number">4.</span>
              {' '}
              Expected budget
            </div>
            <div className="estimate-input-cols">
              <div className="options-wrapper odd-options-number">
                <div className="input-radio-wrap">
                  <input
                    name="budget"
                    type="radio"
                    value="Less than $10,000"
                    id="budgetLtTen"
                    onChange={(event) => {
                      setBudget({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={budget.value === 'Less than $10,000'}
                  />
                  <label htmlFor="budgetLtTen" className="label-for-radio-btn">
                    Less than $10,000
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="budget"
                    type="radio"
                    value="$10,000 - $45,000"
                    id="tenToForty"
                    onChange={(event) => {
                      setBudget({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={budget.value === '$10,000 - $45,000'}
                  />
                  <label htmlFor="tenToForty" className="label-for-radio-btn">
                    $10,000 - $45,000
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="budget"
                    type="radio"
                    value="More than $45,000"
                    id="budgetMoreThen"
                    onChange={(event) => {
                      setBudget({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={budget.value === 'More than $45,000'}
                  />
                  <label htmlFor="budgetMoreThen" className="label-for-radio-btn">
                  More than $45,000
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="budget"
                    type="radio"
                    value="I am not sure about the expected budget"
                    id="budgetNotSure"
                    onChange={(event) => {
                      setBudget({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={budget.value === 'I am not sure about the expected budget'}
                  />
                  <label htmlFor="budgetNotSure" className="label-for-radio-btn">
                    I am not sure
                  </label>
                </div>
              </div>
            </div>
            <div className="wizard-stage-footer mt-auto">
              <button
                onClick={wizardStageDecreaser}
                type="button"
                className="button no-shadow text-uppercase btn-wide"
              >
                Back
              </button>
              <button
                type="button"
                className="button button-send btn-wide"
                onClick={wizardStageIncreaser}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {wizardStage === 2 && (
          <div className="wizard-stage">
            <div className="question-title">
              <span className="question-number">5.</span>
              {' '}
Timeframe
            </div>
            <div className="estimate-input-cols">
              <div className="options-wrapper odd-options-number">
                <div className="input-radio-wrap">
                  <input
                    name="timeframe"
                    type="radio"
                    value="I am not sure about the timeframe"
                    id="timeframeLessThanAMonth"
                    onChange={(event) => {
                      setTimeframe({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={timeframe.value === 'I am not sure about the timeframe'}
                  />
                  <label
                    htmlFor="timeframeLessThanAMonth"
                    className="label-for-radio-btn"
                  >
                    I am not sure
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="timeframe"
                    type="radio"
                    value="Less than 1 month"
                    id="notSureTimeframe"
                    onChange={(event) => {
                      setTimeframe({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={timeframe.value === 'Less than 1 month'}
                  />
                  <label
                    htmlFor="notSureTimeframe"
                    className="label-for-radio-btn"
                  >
                    Less than 1 month
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="timeframe"
                    type="radio"
                    value="1 to 3 months"
                    id="timeframeOneToThree"
                    onChange={(event) => {
                      setTimeframe({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={timeframe.value === '1 to 3 months'}
                  />
                  <label
                    htmlFor="timeframeOneToThree"
                    className="label-for-radio-btn"
                  >
                    1 to 3 months
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="timeframe"
                    type="radio"
                    value="3 to 6 months"
                    id="TimeFrameThreeToSix"
                    onChange={(event) => {
                      setTimeframe({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={timeframe.value === '3 to 6 months'}
                  />
                  <label
                    htmlFor="TimeFrameThreeToSix"
                    className="label-for-radio-btn"
                  >
                    3 to 6 months
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="timeframe"
                    type="radio"
                    value="More than 6 months"
                    id="timeframeIsAboveSixMonths"
                    onChange={(event) => {
                      setTimeframe({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={timeframe.value === 'More than 6 months'}
                  />
                  <label
                    htmlFor="timeframeIsAboveSixMonths"
                    className="label-for-radio-btn"
                  >
                    More than 6 months
                  </label>
                </div>
              </div>
            </div>
            <div className="question-title">
              <span className="question-number">6.</span>
              {' '}
Start
            </div>
            <div className="estimate-input-cols">
              <div className="options-wrapper">
                <div className="input-radio-wrap">
                  <input
                    name="start"
                    type="radio"
                    value="I am not sure about the start"
                    id="startNotSure"
                    onChange={(event) => {
                      setStart({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={start.value === 'I am not sure about the start'}
                  />
                  <label htmlFor="startNotSure" className="label-for-radio-btn">
                    I am not sure
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="start"
                    type="radio"
                    value="In a couple of days"
                    id="startInACoupleOfDays"
                    onChange={(event) => {
                      setStart({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={start.value === 'In a couple of days'}
                  />
                  <label
                    htmlFor="startInACoupleOfDays"
                    className="label-for-radio-btn"
                  >
                    In a couple of days
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="start"
                    type="radio"
                    value="In a week"
                    id="startInAWeek"
                    onChange={(event) => {
                      setStart({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={start.value === 'In a week'}
                  />
                  <label htmlFor="startInAWeek" className="label-for-radio-btn">
                    In a week
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="start"
                    type="radio"
                    value="In a couple of weeks"
                    id="startInACoupleOfWeeks"
                    onChange={(event) => {
                      setStart({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={start.value === 'In a couple of weeks'}
                  />
                  <label
                    htmlFor="startInACoupleOfWeeks"
                    className="label-for-radio-btn"
                  >
                    In a couple of weeks
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="start"
                    type="radio"
                    value="In a month"
                    id="startInAMonth"
                    onChange={(event) => {
                      setStart({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={start.value === 'In a month'}
                  />
                  <label
                    htmlFor="startInAMonth"
                    className="label-for-radio-btn"
                  >
                    In a month
                  </label>
                </div>
                <div className="input-radio-wrap">
                  <input
                    name="start"
                    type="radio"
                    value="More than a month"
                    id="startInMoreThanMonth"
                    onChange={(event) => {
                      setStart({
                        value: event.target.value,
                        error: '',
                      });
                    }}
                    checked={start.value === 'More than a month'}
                  />
                  <label
                    htmlFor="startInMoreThanMonth"
                    className="label-for-radio-btn"
                  >
                    More than a month
                  </label>
                </div>
              </div>
            </div>
            <div className="wizard-stage-footer mt-auto">
              <button
                onClick={wizardStageDecreaser}
                type="button"
                className="button no-shadow text-uppercase btn-wide"
              >
                Back
              </button>
              <button
                type="button"
                onClick={wizardStageIncreaser}
                className="button button-send btn-wide"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {wizardStage === 3 && (
          <div className="wizard-stage">
            <div className="contacts-form">
              <div className="input-cols">
                <div className="input-wrap">
                  <div className="input-email">
                    <div className="mt-40" />
                    <input
                      className={classnames({ error: name.error })}
                      name="name"
                      id="name"
                      type="text"
                      onChange={(event) => setName({ value: event.target.value, error: false })
                      }
                      value={name.value}
                      required
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                </div>
              </div>
              <div className="input-cols">
                <div className="input-wrap">
                  <div className="input-email">
                    <input
                      className={classnames({ error: emailEstimate.error })}
                      name="emailEstimate"
                      id="emailEstimate"
                      type="email"
                      onChange={(event) => setEmailEstimate({
                        value: event.target.value,
                        error: false,
                      })
                      }
                      value={emailEstimate.value}
                      required
                    />
                    <label htmlFor="emailEstimate">Email</label>
                  </div>
                </div>
              </div>

              <div className="input-wrap input-wrap-ta">
                <textarea
                  className={classnames({
                    'message-textarea': true,
                    error: messageEstimate.error,
                  })}
                  name="messageEstimate"
                  id="messageEstimate"
                  onChange={(event) => setMessageEstimate({
                    value: event.target.value,
                    error: false,
                  })
                  }
                  value={messageEstimate.value}
                  placeholder="Your message (optional)"
                />
              </div>
            </div>
            <div className="input-cols">
              <FileUpload
                text={(fileName.length > 10 && fileName !== 'Attach you file')
                  ? fileName.substring(0, 10).concat('...')
                  : fileName}
                limit="up to 10MB"
                allowedExts=".pdf, doc, docx, jpeg, jpg, png, xls, xlsx, ppt, pptx"
                onChange={
                  (e) => {
                    setFile(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                  }
                }
              />
            </div>
            <div className="grey-checkbox-wrapper">
              <Checkbox
                className="grey"
                text={(
                  <>
I want to use a&nbsp;
                    <a href="https://mailchi.mp/keenethics/offers-for-keen-subscribers" target="blanck" className="grey sub-dis">subscriber discount</a>
                  </>
)}
                name="estimateFormIsSubscriberDiscount"
                id="estimateFormIsSubscriberDiscount"
                value="estimateFormIsSubscriberDiscount"
                onChange={() => {
                  setIsSubscriber(!isSubscriber);
                  setHasDiscount(!hasDiscount);
                }}
                isChecked={hasDiscount}
              />
            </div>
            <div className="wizard-stage-footer mt-auto">
              <button
                onClick={wizardStageDecreaser}
                type="button"
                className="button no-shadow text-uppercase btn-wide"
              >
                Back
              </button>
              <button
                type="submit"
                className={classnames('button button-send btn-wide', {
                  'pending no-shadow':
                    !name.value
                    || !emailEstimate.value
                    || isPending,
                })}
              >
                send
              </button>
            </div>
            <div className="privacy-policy">
                By submitting, I agree to KeenEthics’&nbsp;
              <a href="/privacy-policy" target="blanc" classNamve="">Privacy Policy</a>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EstimateForm;
