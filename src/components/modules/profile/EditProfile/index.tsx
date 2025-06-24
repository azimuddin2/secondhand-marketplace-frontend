'use client';

import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import NMImageUploader from '@/components/ui/core/SMImageUploader';
import ImagePreviewer from '@/components/ui/core/SMImageUploader/ImagePreviewer';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cities } from '@/constants/cities';
import { getSingleUser, updateUser } from '@/services/User';

const EditProfileForm = () => {
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      education: '',
      jobTitle: '',
      company: '',
      portfolio: '',
      linkedInProfile: '',
      facebookProfile: '',
    },
  });

  // Reset form values when userInfo is available
  useEffect(() => {
    if (userInfo) {
      form.reset({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        city: userInfo.city || '',
        address: userInfo.address || '',
        education: userInfo.education || '',
        jobTitle: userInfo.jobTitle || '',
        company: userInfo.company || '',
        portfolio: userInfo.portfolio || '',
        linkedInProfile: userInfo.linkedInProfile || '',
        facebookProfile: userInfo.facebookProfile || '',
      });
    }
  }, [userInfo, form.reset]);

  // user data load
  useEffect(() => {
    if (user?.userId) {
      getSingleUser(user.userId)
        .then((data) => {
          if (!data || data?.success === false) {
            toast.error(data?.message || 'Failed to fetch user data');
          } else {
            setUserInfo(data.data);
          }
        })
        .catch(() => toast.error('Failed to load profile.'));
    }
  }, [user?.userId]);

  const {
    formState: { isSubmitting },
  } = form;

  // Function to upload images to ImgBB
  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];

    setUploading(true);
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const uploadPromises = imageFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', apiKey || '');

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data?.data?.url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    setUploading(false);
    return uploadedUrls;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const uploadedImageUrls = await uploadImages();
      data.images = uploadedImageUrls;

      const res = await updateUser(user?.email as string, data);
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        router.push(`/${user?.role}/view-profile`);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl flex-grow max-w-3xl p-4 lg:p-5">
      <div className="flex items-center space-x-4 border-b mb-4 pb-3">
        <Image src={logo} alt="Logo" width="50" height="50" />
        <div>
          <h1 className="text-2xl font-semibold">Edit Profile</h1>
          <p className="font-extralight text-sm text-gray-700">
            Today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <div className="flex justify-between items-center border-b py-3 my-5">
              <p className="text-primary font-semibold text-xl">
                Basic Information
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <Select
                      value={field.value || ''}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Your City" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city, index) => (
                          <SelectItem key={index} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-5">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-30 resize-none"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-semibold text-xl">
                Professional Details
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedInProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebookProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook Profile</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-semibold text-xl">Images</p>
            </div>
            <div className="flex gap-4 ">
              {imagePreview.length > 0 ? (
                <ImagePreviewer
                  className="flex flex-wrap gap-4"
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              ) : (
                <NMImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Image"
                  className="w-full lg:w-fit mt-0"
                />
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="mt-5 w-full cursor-pointer"
            disabled={isSubmitting || uploading}
          >
            {uploading
              ? 'Uploading Images...'
              : isSubmitting
                ? 'Saveing...'
                : 'Save'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
