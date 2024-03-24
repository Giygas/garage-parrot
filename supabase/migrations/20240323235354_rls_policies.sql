-- Function for checking if id passed as param is admin
CREATE OR REPLACE FUNCTION is_admin(id uuid)
  RETURNS boolean
  AS $$
BEGIN
  IF id IN(
    SELECT
      profiles.id
    FROM
      profiles
    WHERE
      profiles.role_type = 0) THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$
LANGUAGE PLpgSQL;

ALTER TABLE public.voitures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_view_vehicles" ON public.voitures
  FOR SELECT TO public
    USING (TRUE);

CREATE POLICY "authenticated_insert_vehicles" ON public.voitures
  FOR ALL TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

ALTER TABLE public.temoignages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "temoignage_read" ON public.temoignages
  FOR SELECT TO public
    USING (TRUE);

CREATE POLICY "temoignage_insert" ON public.temoignages
  FOR INSERT TO public
    WITH CHECK (TRUE);

CREATE POLICY "temoignage_validation" ON public.temoignages
  FOR UPDATE TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

CREATE POLICY "temoignage_delete" ON public.temoignages
  FOR DELETE TO authenticated
    USING (TRUE);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contact_read" ON public.contacts
  FOR SELECT TO authenticated
    USING (TRUE);

CREATE POLICY "contact_insert" ON public.contacts
  FOR INSERT TO public
    WITH CHECK (TRUE);

CREATE POLICY "contact_update" ON public.contacts
  FOR UPDATE TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

CREATE POLICY "contact_delete" ON public.contacts
  FOR DELETE TO authenticated
    USING (TRUE);

ALTER TABLE public.horaires ENABLE ROW LEVEL SECURITY;

CREATE POLICY "only_admin" ON public.horaires
  FOR ALL TO authenticated
    USING (is_admin(auth.uid()))
    WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "horaires_view" ON public.horaires
  FOR SELECT TO public
    USING (TRUE);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "only_admin" ON public.services
  FOR ALL TO authenticated
    USING (is_admin(auth.uid()))
    WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "services_view" ON public.services
  FOR SELECT TO public
    USING (TRUE);

ALTER TABLE public.voitures_transmission ENABLE ROW LEVEL SECURITY;

CREATE POLICY "transmission_view" ON public.voitures_transmission
  FOR SELECT TO public
    USING (TRUE);

CREATE POLICY "transmission_modify" ON public.voitures_transmission
  FOR ALL TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

