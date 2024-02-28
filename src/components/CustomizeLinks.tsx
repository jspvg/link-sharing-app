import { useCallback, useEffect, useState } from 'react';
import Dropdown from './elements/Dropdown';
import SmallPlatform from './platform/SmallPlatform';
import '../styles/components/customize.scss';
import usePlatforms from '../hooks/usePlatforms';
import { useUser } from '../hooks/useUser';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormSchema,
  emptyPlatform,
} from '../lib/validation/customizeLinksSchemas';
import {
  FormData,
  removeUserPlatform,
  saveUserPlatform,
} from '../lib/api/apiCalls/customizeLinksAPI';
import { useUserDetails } from '../hooks/useUserDetails';
import { Platform, UserPlatform } from '../lib/types';

const CustomizeLinks = () => {
  const { user } = useUser();
  const { userPlatforms, setUserPlatforms } = useUserDetails();

  const [isLoadingUserPlatforms, setIsLoadingUserPlatforms] = useState(true);

  const platforms = usePlatforms();

  const [isAddingPlatform, setIsAddingPlatform] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<UserPlatform | null>(
    null,
  );
  const [platformToEdit, setPlatformToEdit] = useState<Platform | undefined>(
    undefined,
  );

  const [existsError, setExistsError] = useState('');
  const [maxPlatformsError, setMaxPlatformsError] = useState('');

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
    reset,
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

  const handleEditingPlatform = (user_platform: UserPlatform) => {
    if (user_platform) {
      const newEditPlatform = platforms.find(
        (platform) => user_platform.platform_id === platform.platform_id,
      );
      setPlatformToEdit(newEditPlatform);
    }
  };

  const handleAddLink = useCallback(() => {
    if (userPlatforms.length >= 5) {
      setMaxPlatformsError('You cannot add more than 5 platforms.');
      return;
    }

    setMaxPlatformsError('');
    setIsAddingPlatform(true);
    setEditingPlatform(null);
  }, [userPlatforms]);

  const handleSaveLink = useCallback(() => {
    handleSubmit((data) => {
      const platformExists = userPlatforms.some(
        (platform) =>
          platform.platform_id === data.selectedPlatform.platform_id,
      );

      if (editingPlatform) {
        saveUserPlatform(
          data as FormData,
          user,
          setUserPlatforms,
          editingPlatform,
        );
      } else if (platformExists) {
        setExistsError('This platform has already been added.');
        return;
      } else {
        saveUserPlatform(
          data as FormData,
          user,
          setUserPlatforms,
          editingPlatform,
        );
      }
      setExistsError('');

      setIsAddingPlatform(false);
      setEditingPlatform(null);
      setPlatformToEdit(undefined);

      reset({ selectedPlatform: emptyPlatform, platformUrl: '' });
    })();
  }, [
    handleSubmit,
    userPlatforms,
    editingPlatform,
    user,
    setUserPlatforms,
    reset,
  ]);

  const handleCancelAdd = useCallback(() => {
    setIsAddingPlatform(false);
  }, []);

  if (isLoadingUserPlatforms) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="customize-header">
        <p className="error">
          This web app is currently only "responsive" for screens 1440x984 and
          larger. A more responsive experience is under development...
        </p>

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
                handleEditPlatform={() => {
                  setEditingPlatform(userPlatforms[index]);
                  setIsAddingPlatform(true);
                  handleEditingPlatform(userPlatforms[index]);
                }}
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
        {maxPlatformsError && <p className="error">{maxPlatformsError}</p>}
        {isAddingPlatform && (
          <form className="link-form">
            <div className="form-header">
              <h2>Link</h2>
              <p>
                <button onClick={handleCancelAdd}>Cancel</button>
              </p>
            </div>

            <label>Platform</label>
            <Controller
              name="selectedPlatform"
              control={control}
              defaultValue={editingPlatform ? platformToEdit : emptyPlatform}
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
              defaultValue={editingPlatform ? editingPlatform.url : ''}
              {...register('platformUrl')}
            />
            {errors.platformUrl?.message && (
              <p className="error">{errors.platformUrl.message as string}</p>
            )}
          </form>
        )}
        {existsError && <p className="error">{existsError}</p>}
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
