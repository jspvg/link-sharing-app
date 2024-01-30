import { useCallback, useEffect, useState } from 'react';
import { UserPlatform } from '../lib/types';
import Dropdown from './elements/Dropdown';
import SmallPlatform from './platform/SmallPlatform';
import '../styles/components/customize.scss';
import usePlatforms from '../hooks/usePlatforms';
import { useUser } from '../hooks/useUser';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '../lib/validation/customizeLinksSchemas';
import {
  FormData,
  removeUserPlatform,
  saveUserPlatform,
} from '../lib/api/apiCalls/customizeLinksAPI';

const emptyPlatform = {
  platform_id: '',
  name: '',
  logo_gray: '',
  logo_white: '',
  color: '',
  url: '',
};

const CustomizeLinks = ({
  userPlatforms,
  setUserPlatforms,
}: {
  userPlatforms: UserPlatform[];
  setUserPlatforms: React.Dispatch<React.SetStateAction<UserPlatform[]>>;
}) => {
  const { user } = useUser();

  const [isLoadingUserPlatforms, setIsLoadingUserPlatforms] = useState(true);

  const platforms = usePlatforms();

  const [isAddingPlatform, setIsAddingPlatform] = useState(false);

  useEffect(() => {
    if (userPlatforms) {
      setIsLoadingUserPlatforms(false);
    }
  }, [userPlatforms]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
  });

  const handleRemovePlatform = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      const index = Number(event.currentTarget.getAttribute('data-index'));
      removeUserPlatform(userPlatforms, index, setUserPlatforms);
    },
    [setUserPlatforms, userPlatforms],
  );

  const handleAddLink = useCallback(() => {
    if (userPlatforms.length >= 5) {
      alert('You cannot add more than 5 platforms.');
      return;
    }

    setIsAddingPlatform(true);
  }, [userPlatforms]);

  const handleSaveLink = useCallback(() => {
    handleSubmit((data) => {
      saveUserPlatform(data as FormData, user, setUserPlatforms);
      setIsAddingPlatform(false);
    })();
  }, [handleSubmit, user, setUserPlatforms]);

  const handleCancelAdd = useCallback(() => {
    setIsAddingPlatform(false);
  }, []);

  if (isLoadingUserPlatforms) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="customize-header">
        <h1>Customize your links</h1>
        <p className="header-p">
          Add/remove links below and then share all your profiles with the
          world!
        </p>
        <button
          className="nav-link nav-preview link-button"
          onClick={handleAddLink}
        >
          + Add new link
        </button>
      </div>
      <div className="added-platforms">
        {Array.from({ length: 5 }).map((_, index) => {
          if (index < userPlatforms.length) {
            return (
              <SmallPlatform
                key={index}
                userPlatform={userPlatforms[index]}
                index={index}
                handleRemovePlatform={handleRemovePlatform}
              />
            );
          } else {
            return (
              <div className="platform" key={index}>
                {/* Render empty platform elements as placeholders */}
              </div>
            );
          }
        })}
      </div>
      <div className={`customize-body`}>
        {isAddingPlatform && (
          <form className="link-form">
            <div className="form-header">
              <h2>New Link</h2>
              <p>
                <button onClick={handleCancelAdd}>Cancel</button>
              </p>
            </div>

            <label>Platform</label>
            <Controller
              name="selectedPlatform"
              control={control}
              defaultValue={emptyPlatform}
              render={({ field }) => (
                <Dropdown
                  platforms={platforms}
                  selectedPlatform={field.value}
                  onSelect={field.onChange}
                />
              )}
            />

            {errors.selectedPlatform?.message && (
              <p className="error">
                {errors.selectedPlatform.message as string}
              </p>
            )}
            <label>Link</label>
            <input
              type="url"
              className="element-input"
              placeholder="e.g. https://www.github.com/johnappleseed"
              {...register('platformUrl')}
            />
            {errors.platformUrl?.message && (
              <p className="error">{errors.platformUrl.message as string}</p>
            )}
          </form>
        )}
      </div>
      <div className="save-button">
        <button
          className="button"
          onClick={handleSaveLink}
          disabled={!isAddingPlatform}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default CustomizeLinks;
